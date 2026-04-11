# SEO & Performance Improvements (P1) - Portfolio Diego Moreno

## Estado Actual ✅
- ✅ `robots.txt` mejorado (agregadas bloqueos para bots AI)
- ✅ `sitemap.xml` actualizado con lastmod actual
- ✅ Componente `MetaTags.jsx` creado para metadata dinámica
- ✅ Componente `StructuredData.jsx` creado para JSON-LD (Person schema)
- ✅ `App.js` actualizado para usar MetaTags y PersonSchema
- ✅ Estructura semántica: `<main>`, `<section id="...">`, `<h1>` y `<h2>` ya presentes

## Mejoras P1 - On-Page SEO & Performance

### 1. Optimización de Títulos y Descripciones por Sección

#### Problema
- Los títulos y descriptions en OG/Twitter Cards son estáticos
- No se actualizan al navegar entre secciones

#### Solución
Crear un hook personalizado `useMetadata` + actualizar MetaTags en componentes:

```javascript
// Por implementar en cada sección
// En About.jsx:
const About = () => {
  const { t } = useTranslation();
  
  // Usar el hook para actualizar metadata
  useMetadata({
    title: "Sobre Mí | Diego Moreno - Backend Developer",
    description: "Conoce mi experiencia en desarrollo backend, SAP, Tableau y gestión de datos...",
    url: "https://dm13250.netlify.app/#about"
  });
  
  // ... rest del component
};

// En Skills.jsx:
useMetadata({
  title: "Habilidades | React, Django, Ruby on Rails, SAP...",
  description: "Stack técnico completo: frontend, backend, datos y automatización...",
  url: "https://dm13250.netlify.app/#skills"
});

// En Projects.jsx:
useMetadata({
  title: "Proyectos | Portfolio de desarrollo web y backend",
  description: "Proyectos destacados con React, Drupal, Django, Ruby on Rails...",
  url: "https://dm13250.netlify.app/#projects"
});
```

**Checklist:**
- [ ] Crear hook `useMetadata` en `src/hooks/useMetadata.js`
- [ ] Agregar `useMetadata` a cada componente de sección
- [ ] Validar con DevTools (opción "Ver código fuente") que los meta tags cambian

### 2. Optimización de Imágenes (Core Web Vitals)

#### Problema
- Imágenes sin `width/height` → riesgo de **CLS** (Cumulative Layout Shift)
- Sin `srcset/sizes` → no responsive
- Formatos legacy (PNG/JPG) en lugar de moderno (WebP)

#### Solución en Skills.jsx
```jsx
<img 
  src={skill.icon} 
  alt={skill.name}      // ✅ Ya tiene alt
  className="skill-icon"
  loading="lazy"        // ✅ Ya tiene lazy loading
  width="70"           // ✅ Already present
  height="70"          // ✅ Already present
  decoding="async"     // ← Agregar para mejorar rendimiento
/>
```

**Proximos pasos para imágenes de proyectos:**
```jsx
// En Projects.jsx - iterar sobre imagenes de proyecto
<motion.div className="project-card-image">
  <picture>
    <source srcSet={project.imageWebP} type="image/webp" />
    <img
      src={project.image}
      alt={t(`projects.items.${project.key}.title`)}
      width={300}
      height={200}
      loading="lazy"
      decoding="async"
      className="project-image"
    />
  </picture>
</motion.div>
```

**Checklist:**
- [ ] Asegurar todas las imágenes tienen `width` y `height`
- [ ] Agregar `decoding="async"` a todas las imágenes
- [ ] Convertir imágenes de proyecto a WebP (ffmpeg o herramienta online)
- [ ] Agregar `<picture>` para formato WebP + fallback JPG
- [ ] Validar CLS con Lighthouse (`npm run build && npx serve -s build`)
- [ ] Medir LCP (Largest Contentful Paint): debe ser ≤ 2.5s

### 3. Accesibilidad + Semántica (A11y)

#### Mejoras implementadas
- ✅ `<main>` en App.js
- ✅ `<section id="...">` para cada sección
- ✅ `<h1>` en Hero, `<h2>` en secciones
- ✅ `<header>` y `<footer>` en Header/Footer components

#### Por agregar
```jsx
// En Header.jsx o Navbar.jsx - Agregar "skip link"
<a href="#main-content" className="skip-link">
  Saltar al contenido principal
</a>

// En App.js - agregar id al main
<main id="main-content" className={isSidebarOpen ? 'sidebar-open' : ''}>
```

**Estilos CSS para skip-link:**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

**Checklist:**
- [ ] Agregar skip-link al Header/Navbar
- [ ] Verificar contraste de colores (WCAG AA mínimo)
- [ ] Probar navegación con teclado (Tab)
- [ ] Validar con WAVE (Web Accessibility Evaluation Tool)

### 4. Core Web Vitals - Performance Tunning

#### Métricas objetivo (p75)
| Métrica | Bueno | Mejorable | Malo  |
|---------|-------|-----------|-------|
| LCP     | ≤2.5s | 2.5-4s   | >4s   |
| INP     | ≤200ms| 200-500ms| >500ms|
| CLS     | ≤0.1  | 0.1-0.25 | >0.25 |
| TTFB    | ≤0.8s | 0.8-1.8s | >1.8s |

#### Acciones por métrica

**LCP (Largest Contentful Paint)** - Primer contenido visible
- Optimizar imágenes hero (comprimir, WebP)
- Diferir CSS no crítico
- Lazy-load componentes no visible (ya haces con Suspense + lazy)

**CLS (Cumulative Layout Shift)** - Estabilidad visual
- Asegurar width/height en imágenes ✅ (ya hecho)
- Évitar cambios de fuente en runtime
- Reservar espacio para anuncios/widgets

**INP (Interaction to Next Paint)** - Responsiveness
- Reducir JavaScript en thread principal
- Fragmentar tareas largas (requestIdleCallback o Web Workers)
- Optimizar event listeners (delegation)

**TTFB (Time to First Byte)** - Conexión con servidor
- Netlify optimiza automáticamente
- Validar en PageSpeed Insights o CrUX

#### Comandos para medir localmente
```bash
# Build y servir en local (simula Netlify)
npm run build
npx serve -s build

# Lighthouse desde CLI
npx lighthouse http://localhost:3000 --view

# Generar reporte JSON detallado
npx lighthouse http://localhost:3000 --output=json > lighthouse-report.json
```

**Checklist:**
- [ ] Ejecutar `npm run build` sin errores
- [ ] Medir Lighthouse (local y PageSpeed Insights)
- [ ] Documentar métricas base (screenshot de Lighthouse)
- [ ] Diferenciar CSS crítico (above-the-fold)  
- [ ] Agregar `decoding="async"` a todas las imágenes
- [ ] Validar INP con Chrome DevTools (Performance tab)

### 5. Open Graph + Twitter Cards (Social Sharing)

#### Componentes ya implementados en MetaTags.jsx
✅ `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
✅ `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

#### Mejoras adicionales
Agregar a MetaTags.jsx:
```javascript
// Para cada tipo de contenido (proyecto, página, etc.)
updateMetaTag('og:type', type, true);  // 'website', 'article', etc.
updateMetaTag('article:published_time', publishDate, true); // si es artículo
updateMetaTag('article:author', author, true); // si es artículo

// Validar que OG image siempre es URL completa, no relativa
const fullImageUrl = image.startsWith('http') 
  ? image 
  : `https://dm13250.netlify.app${image}`;
```

**Validadores**
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook OG Debugger: https://developers.facebook.com/tools/debug/
- Google Rich Results Test: https://search.google.com/test/rich-results

**Checklist:**
- [ ] Crear imágenes OG específicas (1200x630px) para home, skills, projects
- [ ] Validar URLs con Twitter Card Validator
- [ ] Validar URLs con Facebook OG Debugger

### 6. JSON-LD Estructurado (Schema.org)

#### Schemas ya implementados en StructuredData.jsx
✅ `Person` - Describe quién eres + redes sociales
✅ `BreadcrumbList` - Navegación por migas de pan (para blogs/proyectos)

#### Esquemas adicionales recomendados

**WebSite schema** (ya en index.html, pero mejorable):
```javascript
// Agregar a StructuredData.jsx
const WebSiteSchema = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Diego Moreno Portfolio",
      "url": "https://dm13250.netlify.app/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://dm13250.netlify.app/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };
    // Insertar en <head>...
  }, []);
  return null;
};
```

**CreativeWork schema** (opcional, para proyectos individuales):
```javascript
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Nombre del Proyecto",
  "description": "Descripción corta",
  "creator": { "@type": "Person", "name": "Diego Moreno" },
  "dateCreated": "2024-01-15",
  "url": "https://DiegoMoreno.netlify.app/#projects",
  "image": "https://dm13250.netlify.app/og/proyecto.jpg",
  "codeRepository": "https://github.com/DM13250/proyecto"
}
```

**Validador**
- Google Rich Results Test: https://search.google.com/test/rich-results

**Checklist:**
- [ ] Validar Person schema con Rich Results Test
- [ ] Agregar WebSite schema opcional (para búsqueda)
- [ ] Considerar CreativeWork para proyectos destacados

### 7. Hreflang + Alternates (Internacionalización)

#### Situación actual
Ya tienes i18n (es/en) pero con `#about`, `#skills`, etc.

#### Mejora
En MetaTags.jsx, agregar:
```javascript
useEffect(() => {
  // Detectar idioma actual desde i18n
  const currentLang = i18n.language || 'es';
  
  // Agregar link alternates para versiones de idioma
  let alternates = document.querySelector('link[rel="alternate"][hreflang="es"]');
  if (!alternates) {
    // Crear alternates para ES
    const altEs = document.createElement('link');
    altEs.rel = 'alternate';
    altEs.hreflang = 'es';
    altEs.href = `https://dm13250.netlify.app/?lang=es${url}`;
    document.head.appendChild(altEs);
    
    // Crear alternates para EN
    const altEn = document.createElement('link');
    altEn.rel = 'alternate';
    altEn.hreflang = 'en';
    altEn.href = `https://dm13250.netlify.app/?lang=en${url}`;
    document.head.appendChild(altEn);
    
    // Canonical a la versión atual
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical.href = url;
  }
}, [i18n.language, url]);
```

**Nota:** Hreflang es mejor en sitios con URLs limpias. En SPA con `#`, es opcional pero recomendado.

**Checklist:**
- [ ] Decidir si mantener hreflang para SPA '#' (low priority)
- [ ] Priorizar migración a Next.js (P2) para URLs limpias

---

## Validación y Pruebas (Herramientas Recomendadas)

### 1. SEO On-Page
- [Google Search Console](https://search.google.com/search-console) (indispensable)
  - Inspección de URLs
  - Core Web Vitals
  - Cobertura de índice
  - Performance de búsqueda

- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) (crawling local)
  - Detecta títulos duplicados
  - Canonicals rotos
  - Status codes
  - Meta descriptions faltantes

### 2. Performance
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (CLI: `npx lighthouse`)
- [WebPageTest](https://www.webpagetest.org/)

### 3. Rich Results / Schema
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 4. Social
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### 5. Accesibilidad
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)
- Browser DevTools: Panel "Accessibility"

---

## Resumen de Checklist P1 (Priorizado)

### ALTA PRIORIDAD (1-2 días)
```
☐ Validar sitio en Google Search Console (URL Inspection)
☐ Ejecutar Lighthouse localmente y documentar métricas base
☐ Agregar skip-link en Header/Navbar
☐ Asegurar width/height en TODAS las imágenes (ya hecho en Skills)
☐ Validar OG/Twitter Cards (Twitter Validator + Facebook Debugger)
☐ Validar Person schema con Rich Results Test
```

### MEDIA PRIORIDAD (3-7 días)
```
☐ Crear/mejorar imágenes OG (1200x630px)
☐ Optimizar imágenes de proyecto (WebP + fallback)
☐ Convertir Skills icons a WebP si es posible
☐ Mejorar TTFB con Netlify CDN cache headers (ya hecho netlify.toml)
☐ Agregar decoding="async" a todas las imágenes
☐ Medir y reducir INP (JavaScript en main thread)
```

### BAJA PRIORIDAD (FUTURO)
```
☐ Agregar hreflang (esperar migración a Next.js)
☐ CreativeWork schema para proyectos individuales
☐ WebSite schema mejorado (optional)
☐ Monitorización continua (CrUX API, Search Console)
```

---

## Próximo Paso: P2 - Migración a Next.js

Ver archivo: `NEXTJS_MIGRATION_GUIDE.md`

Resumen:
- Cambiar de CSR SPA → SSG/SSR (mejor SEO, social, performance)
- Rutas limpias: `/sobre-mi`, `/proyectos`, `/proyectos/[slug]`
- Metadata por ruta: `next/head`, `generateMetadata`
- Sitemap automático: `app/sitemap.ts`
- Soporte nativo de OpenGraph, Twitter Cards y robots.txt

---

## Referencias
- [Google SEO Beginner's Guide](https://developers.google.com/search/docs)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Netlify Documentation](https://docs.netlify.com/)
