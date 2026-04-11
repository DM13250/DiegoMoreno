# Plan de Acción Inmediata - Portfolio Diego Moreno

## ✅ Tareas Completadas

### P0 (Crítico - Completado)
- ✅ Mejorado `robots.txt` (bloqueado GPTBot, CCBot)
- ✅ Actualizado `sitemap.xml` con fecha actual (2026-04-11)
- ✅ Validado estructura estándar

### P1 (Importante - Parcialmente Completado)
- ✅ Creado componente `MetaTags.jsx` para metadata dinámica
- ✅ Creado componente `StructuredData.jsx` para JSON-LD (Person, BreadcrumbList)
- ✅ Actualizado `App.js` para usar MetaTags y PersonSchema
- ✅ Verificada estructura semántica: `<main>`, `<section>`, `<h1>`, `<h2>` presentes
- ✅ Documento completo de mejoras creado: `IMPROVEMENT_P1_SEO_PERFORMANCE.md`

### P2 (Refactoring - Documentado)
- ✅ Guía completa de migración a Next.js creada: `NEXTJS_MIGRATION_GUIDE.md`

---

## 🚀 Próximas Acciones (Prioridad)

### ESTA SEMANA (1-2 días) - **PRIORITARIO**

#### 1. Validar el Sitio en Google Search Console
```
1. Ir a: https://search.google.com/search-console
2. Agregar propiedad: https://dm13250.netlify.app/
3. Verificar propiedad (via DNS o archivo HTML)
4. Herramienta "Inspección de URL": https://dm13250.netlify.app/
5. Verificar que devuelve HTTP 200 y que el HTML es correcto
6. Espiar qué ve Google: "URL testear en vivo"
```

**Por Qué:** Confirmar que Google puede indexar el sitio. Si Lighthouse no podía descargar el sitio, Google tampoco.

---

#### 2. Medir Baseline Lighthouse (Localmente)
```bash
# En la carpeta del proyecto:
npm run build
npx serve -s build

# En otra terminal:
npx lighthouse http://localhost:3000 --view

# O acceder a https://pagespeed.web.dev/ y pegar la URL
```

**Qué mirar:**
- Performance score (debe estar >60)
- LCP (Largest Contentful Paint) - objetivo <2.5s
- CLS (Cumulative Layout Shift) - objetivo <0.1
- INP (Interaction to Next Paint) - objetivo <200ms

**Documento despues:** Guardar screenshot de Lighthouse para antes/después.

---

#### 3. Validar Meta Tags (Open Graph + Twitter)
```
1. Copiar URL: https://dm13250.netlify.app/
2. Validador Twitter: https://cards-dev.twitter.com/validator
3. Validador Facebook: https://developers.facebook.com/tools/debug/
4. Validador Google Rich Results: https://search.google.com/test/rich-results
```

**Qué esperar:**
- ✅ Card preview con imagen
- ✅ Title y descripción visibles
- ✅ Person schema reconocido

---

### PRÓXIMAS 2 SEMANAS (3-7 días) - **IMPORTANTE**

#### 4. Implementar Mejoras P1 (Siguiendo `IMPROVEMENT_P1_SEO_PERFORMANCE.md`)

**Tareas específicas:**
```
☐ Crear hook useMetadata() en src/hooks/useMetadata.js
☐ Agregar useMetadata() a About.jsx, Skills.jsx, Projects.jsx
☐ Agregar atributo decoding="async" a TODAS las imágenes
☐ Crear/mejorar imágenes OG (1200x630px) para home, about, projects, skills
☐ Convertir imágenes de proyecto a WebP (herramienta: ffmpeg o TinyPNG)
☐ Re-validar Lighthouse (debería mejorar LCP/INP)
☐ Ejecutar WAVE Accessibility Validator
☐ Agregar "skip link" en Header/Navbar
```

**Documentar:**
```
Antes (P0):
- Lighthouse Score: XX/100
- LCP: XXs
- CLS: X.XX
- TTFb: XXms

Después (P1):
- Lighthouse Score: XX/100
- LCP: XXs
- CLS: X.XX
- TTFB: XXms
- % Mejora: +XX%
```

---

### UNA VEZ LISTA LA INFRAESTRUCTURA REACT (1-2 SEMANAS) - **FUTURO**

#### 5. Planificar Migración Next.js (P2)

**Revisar documentol:** `NEXTJS_MIGRATION_GUIDE.md`

**Decisión importante:**
Preguntar:
- ¿Vale la pena migrar a Next.js (4-6 semanas) para máxima SEO/social/performance?
- **O** ¿Mantener React + SSG (prerender por rutas) como solución "rápida"?

**Pros Next.js:**
- Máxima SEO (HTML con contenido en cada ruta)
- Social sharing perfecto
- Performance excelente (LCP <2s garantizado)
- URLs limpias (/proyectos/[slug] vs #proyectos)

**Pros Mantener React (SPA):**
- Menos cambios estructurales
- Rápida implementación (P1 mejoras + prerender)
- Suficiente SEO para portfolio

---

## 📋 Checklist para Esta Semana

```
DAY 1 (Validación):
☐ Ejecutar npm run build sin errores
☐ Validar en Google Search Console (URL inspection)
☐ Medir Lighthouse localmente (baseline)
☐ Validar OG/Twitter cards (3 validadores)

DAY 2 (Documentación + Planificación):
☐ Documentar resultados Lighthouse (scores, LCP, CLS, INP, TTFB)
☐ Crear imágenes OG (1200x630px) para home, about, projects
☐ Revisar IMPROVEMENT_P1_SEO_PERFORMANCE.md
☐ Revisar NEXTJS_MIGRATION_GUIDE.md
☐ Decidir: ¿Continuar con P1 en React o migrar a Next.js?
```

---

## 📁 Archivos Creados/Modificados

### Archivos Public
```
✅ public/robots.txt                    (mejorado)
✅ public/sitemap.xml                   (actualizado)
```

### Componentes Nuevos
```
✅ src/components/common/MetaTags.jsx
✅ src/components/common/StructuredData.jsx
```

### Configuración
```
✅ src/App.js                           (actualizado con MetaTags)
```

### Documentación
```
✅ IMPROVEMENT_P1_SEO_PERFORMANCE.md    (guía completa P1)
✅ NEXTJS_MIGRATION_GUIDE.md            (guía migración Next.js P2)
✅ IMMEDIATE_ACTIONS.md                 (este archivo)
```

---

## 🔗 Herramientas Recomendadas (Gratuitas)

### SEO & Indexación
| Herramienta | URL | Uso |
|------------|-----|-----|
| Google Search Console | https://search.google.com/search-console | Indexación, Core Web Vitals, Performance |
| Lighthouse (Web) | https://pagespeed.web.dev/ | Performance, Accessibility, SEO |
| Rich Results Test | https://search.google.com/test/rich-results | Validar JSON-LD, Schema |
| URL Inspect (GSC) | Dentro GSC | Ver HTML que indexa Google |

### Social Media
| Herramienta | URL | Uso |
|------------|-----|-----|
| Twitter Card Validator | https://cards-dev.twitter.com/validator | Validar cards Twitter/X |
| Facebook Debugger | https://developers.facebook.com/tools/debug/ | Validar OG tags |
| WhatsApp Link Preview | Enviar URL por WhatsApp | Verificar preview |

### Performance
| Herramienta | URL | Uso |
|------------|-----|-----|
| PageSpeed Insights | https://pagespeed.web.dev/ | Metrics completos |
| WebPageTest | https://www.webpagetest.org/ | Performance detallado |
| GTmetrix | https://gtmetrix.com/ | Métricas y sugerencias |

### Accesibilidad
| Herramienta | URL | Uso |
|------------|-----|-----|
| WAVE Browser Extension | https://wave.webaim.org/extension/ | Validación A11y |
| Lighthouse (Accessibility) | Integrado en Lighthouse | A11y score |
| NVDA Screen Reader | https://www.nvaccess.org/ | Prueba manual narrador |

### Imágenes
| Herramienta | URL | Uso |
|------------|-----|-----|
| TinyPNG/TinyJPG | https://tinypng.com/ | Convertir a WebP |
| FFmpeg | Command line | Convertir masivamente |
| Squoosh | https://squoosh.app/ | WebP en navegador |

---

## 📞 Preguntas Clave a Responder

1. **¿Cuál es tu prioridad?**
   - a) Máxima SEO/Social (↔ Migra a Next.js - 4-6 semanas)
   - b) Mejora rápida de React (↔ P1 + opcional prerender - 1-2 semanas)
   - c) Ambas (haz P1 primero, luego P2)

2. **¿Tienes acceso a Google Search Console?**
   - Necesario para confirmar indexación real

3. **¿Quieres monitorización continua?**
   - Integración con CrUX API, PageSpeed Insights automático, Lighthouse CI

4. **Base de datos dinámica para proyectos?**
   - Afecta arquitectura Next.js (ISR, revalidation)

---

## 🎯 Objetivo Final

**Resultado esperado después de P1+P2:**
```
✅ Lighthouse Score: 90+ (Verde)
✅ LCP: <2.5s (Verde)
✅ INP: <200ms (Verde)  
✅ CLS: <0.1 (Verde)
✅ OG/Twitter Previews: Funcionales
✅ Google Indexación: 100% de URLs
✅ Rich Results: Person Schema validado
✅ Responsive: Mobile first
✅ Accesibilidad: WCAG AA mínimo
```

---

## 💡 Próximo Paso

**Ejecuta HOY:**
```bash
# 1. Build local
npm run build

# 2. Servir localmente
npx serve -s build

# 3. Medir Lighthouse
npx lighthouse http://localhost:3000 --view

# 4. Enviar URL a validadores
# - Twitter: https://cards-dev.twitter.com/validator
# - Facebook: https://developers.facebook.com/tools/debug/
# - Google Rich Results: https://search.google.com/test/rich-results
```

**Luego:**
Reportar resultados y decidir próximo paso (P1 intensive o migración P2).

---

**Documento actualizado:** 2026-04-11  
**Status:** Listo para implementación  
**Soporte:** Ver IMPROVEMENT_P1_SEO_PERFORMANCE.md y NEXTJS_MIGRATION_GUIDE.md
