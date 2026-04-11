/**
 * LIGHTHOUSE_AND_TESTING_GUIDE.md - Guía de Testing con Lighthouse
 * 
 * Instrucciones completas para medir performance, SEO y accesibilidad
 * usando Google Lighthouse y otros tools.
 */

# 🚀 Guía de Lighthouse & Testing

## 1. Instalación y Setup

### Opción A: Lighthouse CLI
```bash
# Instalar globalmente
npm install -g lighthouse

# O instalar como dev dependency del proyecto
npm install --save-dev lighthouse
```

### Opción B: Chrome DevTools (Integrado)
```
F12 → Lighthouse tab → Generate report
(No requiere instalación)
```

### Opción C: PageSpeed Insights (Online)
```
https://pagespeed.web.dev/
(Sin instalación, online)
```

## 2. Ejecutar Lighthouse Localmente

### Antes de Optimización (Build Actual)
```bash
# Compilar aplicación
npm run build

# Servir build localmente
npx serve -s build

# En otra terminal - ejecutar Lighthouse
lighthouse http://localhost:3000 --view

# O con más opciones:
lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report-before.json \
  --view
```

### Después de Optimizaciones (Cuando termine)
```bash
lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report-after.json \
  --view
```

## 3. Métricas Principales (Core Web Vitals)

### Lighthouse Score Objetivo
- **Performance:** 85+ ⭐
- **Accessibility:** 90+ ⭐
- **Best Practices:** 90+ ⭐
- **SEO:** 95+ ⭐

### Métricas Clave a Monitorear

#### A. Performance Metrics
| Métrica | Actual | Objetivo | Cálculo |
|---------|--------|----------|---------|
| **FCP** (First Contentful Paint) | ? | < 1.8s | Primer elemento visible |
| **LCP** (Largest Contentful Paint) | ? | < 2.5s | Mayor contenido visible |
| **CLS** (Cumulative Layout Shift) | ? | < 0.1 | Cambios de layout no planeados |
| **FID** (First Input Delay) | ? | < 100ms | Tiempo respuesta a input |
| **TTI** (Time to Interactive) | ? | < 3.8s | CPU idle para interacción |
| **Total Blocking Time** | ? | < 300ms | Bloques de JS > 50ms |

#### B. SEO Metrics
- [ ] Meta description (160 caracteres)
- [ ] Viewport meta tag
- [ ] Robots.txt válido
- [ ] Dos o más idiomas detectados (hreflang)
- [ ] Canonical URL presente
- [ ] Open Graph tags
- [ ] Structured Data (JSON-LD)
- [ ] Mobile-friendly

#### C. Accessibility Audit
- [ ] ARIA labels en elementos interactivos
- [ ] Roles semánticos (main, nav, section)
- [ ] Contraste de color WCAG AA (4.5:1 para texto)
- [ ] Navegación por teclado funcional
- [ ] Imágenes con alt text descriptivo

## 4. Pasos Previos: Pre-Flight Checklist

Antes de correr Lighthouse, verificar:

```bash
# 1. Verificar que todas las imágenes están optimizadas
ls -la src/assets/img/projects/*.{webp,png}

# 2. Verificar sintaxis de componentes
npm run build

# 3. Verificar que no hay console errors
# (DevTools → Console tab)

# 4. Verificar que MetaTags están presentes
# (DevTools → Elements → <head> section)
```

## 5. Ejecución Completa del Lighthouse

### Script Automatizado (Windows PowerShell)
```powershell
# Guardar como: run-lighthouse.ps1

param(
    [string]$url = "http://localhost:3000",
    [string]$outputDir = "./lighthouse-reports"
)

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

Write-Host "🚀 Starting Lighthouse audit..."
Write-Host "URL: $url"
Write-Host "Output: $outputDir"

# Crear directorio si no existe
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Ejecutar Lighthouse
lighthouse $url `
    --output=html `
    --output=json `
    --output-path="$outputDir/report-$timestamp" `
    --view

Write-Host "✅ Lighthouse report saved to: $outputDir/report-$timestamp.html"
```

Ejecutar:
```bash
powershell -ExecutionPolicy Bypass -File run-lighthouse.ps1
```

## 6. Análisis de Resultados

### Interpretación de Scores

#### 90-100 = Excepcional ✅
- Sin cambios urgentes
- Continuar con optimizaciones menores

#### 50-89 = Necesita Mejora 🟡
- Implementar cambios sugeridos por Lighthouse
- Priorizar por impacto

#### 0-49 = Crítico 🔴
- Requiere atención inmediata
- Bloquea deploy a producción

### Problemas Comunes & Soluciones

```json
{
  "Failure": "Modern image formats (WebP)",
  "Impact": "Reduce image size by 35-80%",
  "Solution": "Convertir PNG/JPG a WebP",
  "Status": "EN PROGRESO - Ver IMAGE_OPTIMIZATION_GUIDE.md"
}

{
  "Failure": "Eliminate render-blocking resources",
  "Impact": "Faster First Contentful Paint",
  "Solution": "Hacer scripts async/defer, CSS inline crítico",
  "Status": "PENDIENTE"
}

{
  "Failure": "Largest Contentful Paint",
  "Impact": "Improve LCP by lazy-loading images",
  "Solution": "loading='lazy' + decoding='async'",
  "Status": "✅ IMPLEMENTADO"
}

{
  "Failure": "Cumulative Layout Shift",
  "Impact": "Evitar movimientos visuales",
  "Solution": "width/height en imágenes, reservar space para anuncios",
  "Status": "✅ VERIFICADO"
}
```

## 7. Diferencias Antes vs Después (Comparación)

### Template de Comparación
```markdown
# Lighthouse Comparison Report

## Fecha Inicio: [DATE]
## Fecha Final: [DATE]

### Performance Score
| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Overall Score | 45 | 85 | +40 |
| FCP | 2.8s | 1.5s | -46% |
| LCP | 4.2s | 2.1s | -50% |
| CLS | 0.15 | 0.05 | -67% |

### SEO Score
| Métrica | Antes | Después |
|---------|-------|---------|
| Overall Score | 70 | 95 | +25 |
| hreflang tags | ❌ | ✅ |
| JSON-LD | Parcial | Completo |

### Accessibility Score
| Métrica | Antes | Después |
|---------|-------|---------|
| Overall Score | 75 | 92 | +17 |
| Color contrast | ⚠️ | ✅ |
| ARIA labels | 60% | 100% |

### Cambios Implementados
- [x] Convertir imágenes a WebP
- [x] Agregar decoding="async"
- [x] Implementar hreflang alternates
- [x] Mejorar JSON-LD schemas
- [ ] Optimizar scripts
- [ ] Mejorar CLS

### Siguiente Fase
- Mobile testing en dispositivos reales
- Implementar FAQSchema
- Service Worker para offline mode
```

## 8. FAQSchema Implementación (si aplica)

Si tienes preguntas frecuentes en tu portfolio:

```jsx
// src/components/common/FAQSchema.jsx
const FAQSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué tecnologías usas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAP, Tableau, Django, Ruby on Rails, Symfony..."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es tu experiencia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Data Analyst & Web Developer con 1+ año de experiencia..."
        }
      }
    ]
  };
  
  useEffect(() => {
    // Insertar en <head>
  }, []);
  
  return null;
};
```

Agregar en App.js si hay FAQs visibles.

## 9. CLS (Cumulative Layout Shift) - Debugging

### Verificar CLS en DevTools
```javascript
// En Console:
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Layout shift:', entry);
  }
}).observe({type: 'layout-shift', buffered: true});
```

### Causas Comunes en Portfolio
1. **Imágenes sin width/height** → ✅ YA FIJO
2. **Ads cargando dinámicamente** → No aplica
3. **Fuentes que cargan tarde** → Revisar font-face
4. **Animaciones framer-motion** → Revisar animate props

## 10. Mobile Testing

### Testing en Dispositivos Reales
```bash
# Expo Android/iOS con ngrok
npx ngrok http 3000
# Acceder desde teléfono: https://[ngrok-url]

# O usar Chrome Remote Debugging
# Chrome → DevTools → More tools → Remote devices
```

### Lighthouse Mobile Audit
```bash
lighthouse http://localhost:3000 \
  --emulated-form-factor=mobile \
  --view
```

### Checklist Mobile
- [ ] Viewport meta tag presente
- [ ] Text legible sin zoom (16px+)
- [ ] Botones clickeables (48x48px mínimo)
- [ ] Scroll suave (no content shift)
- [ ] Performance aceptable (~2-3s LCP)

## 11. Calendario de Testing

### Semana 1: Baseline
- [ ] Ejecutar Lighthouse antes de cambios
- [ ] Documentar scores iniciales
- [ ] Identificar bottlenecks principales

### Semana 2: Optimización Imágenes
- [ ] Convertir a WebP
- [ ] Verificar mejora de LCP
- [ ] Re-ejecutar Lighthouse

### Semana 3: SEO & Accesibilidad
- [ ] Verificar hreflang
- [ ] Audit accesibilidad
- [ ] Implementar FAQSchema

### Semana 4: Final Test & Deploy
- [ ] Full Lighthouse audit
- [ ] Mobile testing
- [ ] Deploy a Netlify
- [ ] Lighthouse en producción

## 12. Comando Rápido Final

```bash
# Todo en una línea (después de npm run build):
npm run build && npx serve -s build & lighthouse http://localhost:3000 --emulated-form-factor=mobile --view
```

## Próximos Pasos

1. **Ahora:** Compilar y obtener baseline de Lighthouse
2. **Convertir imágenes:** Seguir IMAGE_OPTIMIZATION_GUIDE.md
3. **Re-test:** Comparar scores después de WebP
4. **Deploy:** Push a Netlify y re-test en producción

