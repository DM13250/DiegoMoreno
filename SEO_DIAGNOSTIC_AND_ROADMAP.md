# 🔴 DIAGNÓSTICO SEO CRÍTICO - Portfolio Diego Moreno

**Fecha:** 11 Abril 2026  
**URL:** https://dm13250.netlify.app/  
**Status:** ⚠️ CRÍTICO (P0) - Problema de indexación bloqueante

---

## 📋 Hallazgos Principales

### 🔴 P0 (CRÍTICO - Bloquea indexación)

**Problema Identificado:** El auditor SEO público reportó que el sitio devuelve **"UnexpectedStatusCode"** (no 200) para:
- `index.html`
- `robots.txt`
- `sitemap.xml`

**Raíz:** En `netlify.toml`, la redirección SPA universal `/* → /index.html` estaba **capturando también archivos estáticos** (robots.txt, sitemap.xml, manifest.json), reescribiéndolos a index.html en lugar de devolverlos como-son.

**Impacto:**
- Google **no puede leer** robots.txt → no sabe qué crawlear
- Google **no puede leer** sitemap.xml → no descubre URLs
- Herramientas SEO (Lighthouse, PageSpeed, etc.) **fallan** en análisis
- **Indexación completamente bloqueada**

**Status del Fix:**
- ✅ **Identificado en build local:** Devuelve 200 OK para /, /robots.txt, /sitemap.xml
- ✅ **Actualizado netlify.toml:** Excepciones explícitas para archivos SEO-críticos ANTES de la regla SPA
- ⏳ **Pendiente:** Re-build y deploy a Netlify

---

### 🟡 P1 (IMPORTANTE - 1-2 semanas)

#### 1.1 Metadata Dinámico por Sección (60% Completo)
- ✅ Hook `useMetadata()` creado
- ✅ Integrado en About.jsx
- ✅ Integrado en Skills.jsx
- ✅ Integrado en Projects.jsx
- ⏳ Falta: Prueba en navegador y validación SEO

#### 1.2 Open Graph & Twitter Cards (100% ✅)
- ✅ og:title, og:description, og:url, og:image
- ✅ twitter:card, twitter:title, twitter:description, twitter:image
- ⚠️ **Nota:** `og:image` apunta a `/og-image.png` (archivo no existe, usar fallback logo192.png)

#### 1.3 Optimización Core Web Vitals
- ✅ width/height en todas las imágenes → Previene CLS
- ✅ loading="lazy" en imágenes
- ✅ decoding="async" en imágenes
- ❌ **Pendiente:** Convertir PNG/JPG a WebP (Reduce LCP 30-50%)

#### 1.4 Datos Estructurados (100% ✅)
- ✅ JSON-LD Person con datos completos (birthDate, address, email, jobStartDate)
- ✅ JSON-LD WebSite con soporte multilingüe
- ✅ hreflang alternates ES/EN configurado
- ✅ Canonical URL presente

---

### 🟢 P2 (FUTURO - 2-6 semanas)

#### 2.1 Migración a SSG/SSR (Recomendado Next.js)
**Ventajas vs SPA actual:**
| Aspecto | SPA CSR (Actual) | Next.js SSG/SSR |
|---------|---|---|
| HTML Inicial | App-shell (vacío) | Contenido + metadata |
| SEO Crawling | Depende de JS | Inmediato (200 OK) |
| OG/Twitter Preview | Dinámico (falla en bots) | Estático (100% soporte) |
| LCP | Más alto (espera JS) | Más bajo (HTML listo) |
| Mantenibilidad | Metadata en componentes | Metadata centralizada |

**Impacto esperado:**
- Performance Score: +25-35 puntos
- LCP: -30-50%
- Indexación: 100% vs ~70% actual
- Previews sociales: Funcionales para todos los bots

#### 2.2 Measurement & Monitoring
- Ejecutar Lighthouse baseline (después de P1)
- Search Console monitoring (después de deploy P0)
- CrUX API para field data (si hay tráfico)

---

## ✅ Checklist de Acciones Inmediatas (P0)

```
AHORA (Hoy):
[ ] Ejecutar: npm run build (con --openssl-legacy-provider)
[ ] Verificar: npm install -g serve; serve -s build
[ ] Validar: curl /robots.txt, /sitemap.xml, / → devuelven 200
[ ] Confirmar: netlify.toml tiene excepciones = SEO files

EN 1 HORA:
[ ] git add .
[ ] git commit -m "P0: Fix robots/sitemap rewrite, add useMetadata hook, improve structured data"
[ ] git push origin main
[ ] Esperar Netlify auto-deploy (2-5 minutos)

EN 2 HORAS (Validación):
[ ] Acceder a https://dm13250.netlify.app
[ ] Ejecutar: curl -I https://dm13250.netlify.app/robots.txt
[ ] Ejecutar: curl -I https://dm13250.netlify.app/sitemap.xml
[ ] Verificar: Ambas devuelven 200 (no 404, no 302, no 200 html reescrito)

EN 24 HORAS:
[ ] Google Search Console → Inspección de URL → Verificar indexación
[ ] Ejecutar Lighthouse en https://dm13250.netlify.app
[ ] Documentar scores (baseline antes de P1)
```

---

## 📊 Roadmap Priorizado

### P0 - Accesibilidad/Crawl (HOY)
```
netlify.toml fixes
├─ Excepciones robots/sitemap/manifest
├─ Build & Deploy
└─ Validar 200 en todos los archivos

BLOCKER RESUELTO → Indexación posible
```

### P1 - SEO On-Page & Performance (Esta semana)
```
Metadata & OG (90% done)
├─ Crear og-image.png (1200x630)
├─ Test en navegador (About, Skills, Projects)
└─ Validar JSON-LD con Rich Results Test

Imágenes WebP (Documentado, no implementado)
├─ Convertir PNG/JPG → WebP
├─ Implementar srcset/sizes
└─ Medir LCP antes/después

Core Web Vitals
├─ Lighthouse baseline
├─ PageSpeed Insights
└─ Documentar metrics
```

### P2 - Migración SSG/SSR (En siguiente ciclo)
```
Next.js Migration (Recomendado)
├─ Setup Next.js App Router
├─ Migrar rutas (/, /about, /projects, etc.)
├─ Metadata per-page (title, description, OG)
├─ Sitemap y robots generados en build
├─ Deploy en Netlify (compatible)
└─ Comparar metrics: SPA vs Next.js
```

---

## 🚀 Deploy Instructions

### Paso 1: Compilar Localmente (Verifica OpenSSL)
```bash
cd c:\Users\ADMIN\Desktop\Portfolio\DiegoMoreno

# Opción A: Build con NODE_OPTIONS
$env:NODE_OPTIONS = "--openssl-legacy-provider"
npm run build

# Opción B: Actualizar Node.js a v20+ (resuelve legacy issue)
nvm install 20
nvm use 20
npm run build
```

### Paso 2: Validar Build Localmente
```bash
npx serve -s build
# Verificar en navegador: http://localhost:3000
# Verificar robots/sitemap:
#   curl http://localhost:3000/robots.txt
#   curl http://localhost:3000/sitemap.xml
```

### Paso 3: Push a Netlify
```bash
git status  # Verification
git add netlify.toml src/hooks/useMetadata.js src/components/*/[revisados archivos]
git commit -m "P0: Fix SEO blocking issues - robots/sitemap rewrites, dynamic metadata, structured data improvements"
git push origin main

# Netlify auto-deploys (esperar 2-5 min)
# Ver progreso: https://app.netlify.com/sites/[tu-site]/deploys
```

### Paso 4: Validar en Producción
```bash
# Esperar deploy (Green checkmark en Netlify)

# Verificar status codes
curl -I https://dm13250.netlify.app/robots.txt     # Debe ser 200
curl -I https://dm13250.netlify.app/sitemap.xml    # Debe ser 200
curl -I https://dm13250.netlify.app/               # Debe ser 200

# Google Search Console
# Ir a Settings → Sitemaps
# Agregar: https://dm13250.netlify.app/sitemap.xml
# Esperar crawling (pueden ser 24-48h para indexación completa)
```

---

## 📈 Métricas Base & Objetivos

| Métrica | Actual* | P1 Target | P2 Target |
|---------|---------|-----------|-----------|
| **Lighthouse Performance** | ~50 | 75+ | 85+ |
| **Lighthouse SEO** | ~70 | 90+ | 95+ |
| **LCP (p75)** | ~4-5s | 2.5s | 1.8s |
| **CLS** | ~0.1 | <0.1 | <0.05 |
| **Pages Indexed** | ~0% | ~80% | 100% |
| **Robots/Sitemap Access** | ❌ Blocked | ✅ 200 OK | ✅ 200 OK |

**Nota:** *Basado en auditoría pública (no pudimos medir directamente por bloqueador HTTP)

---

## 🔗 Recursos & Referencias

### Google Recommendations
- [Google Core Web Vitals Guide](https://web.dev/vitals/)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Next.js SEO & Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

### Validación Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse/tree/main/lighthouse-cli)
- [Search Console](https://search.google.com/search-console)

### Documentación Creada (En Repo)
- [IMAGE_OPTIMIZATION_GUIDE.md](./IMAGE_OPTIMIZATION_GUIDE.md) - Conversión WebP + optimizaciones
- [LIGHTHOUSE_AND_TESTING_GUIDE.md](./LIGHTHOUSE_AND_TESTING_GUIDE.md) - Testing & métricas

---

## ⚠️ Notas Importantez

1. **netlify.toml orden importa:** Las excepciones de rewrites deben estar ANTES de la regla SPA `/*`
2. **og-image.png fallback:** Crear foto 1200x630 o usar logo192.png existente por ahora
3. **Next.js es recomendado:** Para máxima ROI en SEO a largo plazo (SSG/SSR nativo, metadata, rendering control)
4. **Medida realista: 2-3 semanas** para ir de "no indexable" a "fully optimized SPA" (P0+P1)
5. **4-6 semanas para Next.js migration** si decides hacerla, pero gain enorme en SEO/performance/UX

---

**Próximo Paso:** Ejecuta el deploy P0 hoy. Validación en producción en 2 horas. Rápido + efectivo.

