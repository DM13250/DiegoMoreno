/**
 * IMAGE_OPTIMIZATION_GUIDE.md - Guía de Optimización de Imágenes
 * 
 * Este documento proporciona instrucciones para convertir imágenes a WebP
 * y optimizar su entrega en el portfolio.
 */

# 🖼️ Guía de Optimización de Imágenes

## 1. Conversión a WebP

### Opción A: Usando ImageMagick (Windows - Recomendado)
```bash
# Instalar ImageMagick desde: https://imagemagick.org/script/download.php
# En Windows, descarga el instalador ejecutable

# Después de instalar, convierte imágenes individuales:
magick convert input.png output.webp
magick convert input.jpg output.webp

# O convierte toda una carpeta:
for %f in (*.png) do magick convert "%f" "%~nf.webp"
for %f in (*.jpg) do magick convert "%f" "%~nf.webp"
```

### Opción B: Usando FFmpeg
```bash
# Instalar: https://ffmpeg.org/download.html
ffmpeg -i input.png -c:v libwebp -quality 90 output.webp
ffmpeg -i input.jpg -c:v libwebp -quality 80 output.webp
```

### Opción C: Online (Sin instalación)
- https://cloudconvert.com/
- https://www.freeconvert.com/image-converter
- https://ezgif.com/

## 2. Carpetas que Necesitan Conversión

```
src/assets/img/
├── projects/          ← Convertir PNG/JPG a WebP
│   ├── consum.png
│   ├── benidorm.png
│   ├── caballero.svg  (dejar como está)
│   ├── portfolio.PNG
│   ├── frozen.PNG
│   └── ...más imágenes
│
└── technologies/      ← Convertir PNG/SVG a WebP (excepto SVG)
    ├── drupal.png
    ├── react.png
    ├── javascript.png
    ├── postman.svg    (dejar como está)
    └── ...más iconos
```

## 3. Después de Convertir: Actualizar Componentes

### Para Projects.jsx (Pattern Picture Element):
```jsx
<picture>
  <source srcSet={require('../../assets/img/projects/consum.webp')} type="image/webp" />
  <img 
    src={projectImages.consum} 
    alt="Consum"
    loading="lazy"
    decoding="async"
    width="400"
    height="225"
  />
</picture>
```

### Alternativa Simple (si el navegador soporta WebP):
```jsx
<img 
  src={'/assets/img/projects/consum.webp'}
  alt="Consum"
  loading="lazy"
  decoding="async"
  width="400"
  height="225"
/>
```

## 4. Tamaños Recomendados de Imagen

### Imágenes de Proyectos
- **Tamaño actual:** 400x225 (correcto, aspecto 16:9)
- **Tamaño WebP recomendado:** 
  - Desktop: 600x338px
  - Mobile: 300x169px
  
```jsx
<picture>
  <source media="(max-width: 600px)" srcSet="proyecto-300x169.webp" />
  <source media="(min-width: 601px)" srcSet="proyecto-600x338.webp" />
  <img ... width="400" height="225" />
</picture>
```

### Iconos de Tecnologías
- **Tamaño actual:** 70x70 (correcto)
- **Tamaño WebP recomendado:** 70x70px (sin cambios)

## 5. Compresión Óptima

### Calidad WebP Recomendada
- **Fotos/Imágenes complejas:** calidad 75-80
- **Logotipos/Iconos:** calidad 85-90
- **Imágenes de proyecto:** calidad 80

```bash
# Ejemplos con calidad específica:
magick convert input.png -quality 80 output.webp
ffmpeg -i input.jpg -c:v libwebp -quality 80 output.webp
```

## 6. Testing & Validación

### Verificar Soporte de WebP en Navegador
```javascript
// En DevTools Console:
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 1;
console.log(canvas.toDataURL('image/webp').indexOf('image/webp') === 5);
// true = WebP soportado, false = No soportado
```

### Lighthouse Audit
```bash
npm run build
npx lighthouse https://dm13250.netlify.app --view
# Busca "Modern image formats" en sugerencias
```

## 7. Flujo Completo de Implementación

### Paso 1: Preparar WebP
```bash
cd src/assets/img
# Convertir proyectos
for %f in (projects/*.png projects/*.jpg) do magick convert "%f" "%~nf.webp"

# Convertir iconos (excepto SVG)
for %f in (technologies/*.png) do magick convert "%f" "%~nf.webp"
```

### Paso 2: Actualizar Imports (Projects.jsx)
```javascript
// Antes:
import consum from '../../assets/img/projects/consum.png';

// Después (mantener ambos para fallback):
import consumWebP from '../../assets/img/projects/consum.webp';
import consum from '../../assets/img/projects/consum.png';

const projectImages = {
  consum: consumWebP,  // Usar WebP por defecto
  consumFallback: consum
};
```

### Paso 3: Usar Picture Element
```jsx
<picture>
  <source srcSet={projectImages.consum} type="image/webp" />
  <img src={projectImages.consumFallback} alt="..." ... />
</picture>
```

### Paso 4: Build & Test
```bash
npm run build
npm install -g http-server
http-server build/
# Abrir en navegador y verificar en DevTools que se carga .webp
```

## 8. Métricas de Mejora Esperadas

### Antes de Optimización
- Proyecto PNG: ~150-300KB
- Icono PNG: ~5-15KB
- Tamaño total imágenes: ~2-3MB

### Después de Optimización
- Proyecto WebP: ~40-80KB (75-80% reducción)
- Icono WebP: ~2-5KB (60-70% reducción)
- Tamaño total: ~500-700KB (75% reducción total)

### Impacto en Core Web Vitals
- **LCP (Largest Contentful Paint):** Mejoraría ~10-15%
- **CLS (Cumulative Layout Shift):** Sin cambio (ya tienes width/height)
- **FID (First Input Delay):** Sin cambio significativo

## 9. Herramienta Batch Recomendada (Windows)

### Script PowerShell para Conversión Automatizada
```powershell
# save as: convert-to-webp.ps1
param(
    [string]$sourcePath = "src/assets/img",
    [int]$quality = 80
)

# Instalar ImageMagick primero
$extensions = @("*.png", "*.jpg", "*.jpeg")
$extensions | ForEach-Object {
    Get-ChildItem -Path $sourcePath -Recurse -Filter $_ | ForEach-Object {
        $outputPath = $_.FullName -replace '\.[^.]+$', '.webp'
        Write-Host "Converting: $($_.Name) → $(Split-Path -Leaf $outputPath)"
        & magick convert $_.FullName -quality $quality $outputPath
    }
}
```

Ejecutar:
```bash
powershell -ExecutionPolicy Bypass -File convert-to-webp.ps1
```

## 10. Checklist de Completitud

- [ ] Convertir todas las imágenes PNG/JPG a WebP
- [ ] Actualizar imports en Projects.jsx para WebP
- [ ] Añadir element `<picture>` para fallback
- [ ] Confirmar que `loading="lazy"` está en todas las imágenes
- [ ] Confirmar que `decoding="async"` está en todas las imágenes
- [ ] Confirmar que `width` y `height` están en todas las imágenes
- [ ] Ejecutar `npm run build` sin errores
- [ ] Ejecutar Lighthouse y verificar mejoras
- [ ] Verificar OpenGraph imagen (og-image.png) - convertir a WebP si es posible
- [ ] Commit y push a Netlify para verificar en producción

---

## 11. Próximos Pasos Después de Imágenes

Una vez completada la optimización de imágenes:

1. **Lighthouse Audit** → Ejecutar y documentar métricas base
2. **CLS Optimization** → Verificar que no hay layout shifts
3. **Script Async/Defer** → Revisar carga de scripts
4. **FAQSchema** → Implementar si hay preguntas frecuentes
5. **Mobile Testing** → Verificar en dispositivos reales

