# Guía de Migración a Next.js para SEO Avanzado

## Resumen Ejecutivo

Este documento describe cómo migrar tu portfolio de React CSR (Client-Side Rendering) a **Next.js con SSG (Static Site Generation)**, lo que proporcionará:

- ✅ HTML real por ruta (mejor para bots y SEO)
- ✅ Metadatos únicos (title, description, OG) por página
- ✅ Sitemap dinámico
- ✅ Mejor rendimiento (TTFB, LCP)
- ✅ Mejor soporte de compartir en redes sociales
- ✅ Rutas sin hash (URLs limpias)

**Dificultad estimada:** Media-Alta | **Tiempo estimado:** 4-8 horas

---

## Fase 1: Preparación (Sin código)

### 1.1 Mapeo de rutas actuales vs. nuevas

| Sección Actual | Ruta Actual | Ruta Nueva | SSG/Dinámica |
|---|---|---|---|
| Home | `/#home` | `/` | SSG |
| About | `/#about` | `/sobre-mi` | SSG |
| Skills | `/#skills` | `/habilidades` | SSG |
| Projects | `/#projects` | `/proyectos` | SSG |
| - (futuro) Individual projects | - | `/proyectos/[slug]` | SSG |

### 1.2 Estructura de datos

Los proyectos y datos están actualmente en `Projects.jsx` como un array estático. Necesitarás:

**Crear:** `src/data/projects.json` (o `.ts`)
```json
{
  "projects": [
    {
      "id": 1,
      "slug": "benidorm",
      "title": "Sitio Web Benidorm",
      "description": "...",
      "technologies": ["Drupal 8", "PHP", "jQuery"]
      // ... más campos
    }
  ]
}
```

**Crear:** `src/data/skills.json`
```json
{
  "skills": [
    {
      "name": "React",
      "icon": "react.svg",
      "proficiency": 90
    }
  ]
}
```

---

## Fase 2: Instalación de Next.js

### 2.1 Opción A: Crear un nuevo proyecto Next.js (Recomendado)

```bash
# Crear proyecto Next.js con TypeScript (recomendado para SEO)
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --eslint

# O sin TypeScript si prefieres:
npx create-next-app@latest portfolio-nextjs --javascript --tailwind --eslint
```

### 2.2 Opción B: Migrar la instalación existente

Si prefieres mantener el repositorio actual:

```bash
# Instalar dependencias de Next.js
npm install next react react-dom

# Instalar dependencias opcionales
npm install i18next react-i18next framer-motion @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons

# Actualizar package.json scripts
# {
#   "scripts": {
#     "dev": "next dev",
#     "build": "next build",
#     "start": "next start",
#     "lint": "next lint"
#   }
# }
```

### 2.3 Estructura de directorios esperada

```
portfolio-nextjs/
├── public/
│   ├── sitemap.xml (generado dinámicamente)
│   ├── robots.txt
│   ├── assets/
│   │   ├── img/
│   │   │   ├── logos/
│   │   │   ├── projects/
│   │   │   └── technologies/
├── src/
│   ├── pages/
│   │   ├── index.tsx (Home / /)
│   │   ├── sobre-mi.tsx (/sobre-mi)
│   │   ├── habilidades.tsx (/habilidades)
│   │   ├── proyectos/
│   │   │   ├── index.tsx (/proyectos)
│   │   │   └── [slug].tsx (/proyectos/[slug])
│   │   ├── _app.tsx (Layout global)
│   │   ├── _document.tsx (HTML inicial)
│   │   └── _error.tsx (Error pages)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── ... (resto de componentes)
│   ├── data/
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── experiences.json
│   ├── lib/
│   │   ├── seo.ts (funciones de meta tags)
│   │   └── i18n.ts (configuración i18n)
│   ├── styles/
│   │   └── globals.css (estilos globales)
│   └── types/
│       └── index.ts (tipos TypeScript)
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Fase 3: Migración de Componentes

### 3.1 Migrar Header y Layout

**Crear:** `src/pages/_app.tsx`

```typescript
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
```

**Crear:** `src/pages/_document.tsx` (para personalizaciones de HTML/head)

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Meta tags globales y schema.org irán aquí */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### 3.2 Migrar páginas principales

**Crear:** `src/pages/index.tsx` (Home)

```typescript
import Head from 'next/head';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

const siteUrl = 'https://dm13250.netlify.app';

export default function Home() {
  return (
    <>
      <Head>
        <title>Diego Moreno | Desarrollador Full Stack</title>
        <meta 
          name="description" 
          content="Portafolio profesional de Diego Moreno. Especialista en React, Node.js y desarrollo web moderno." 
        />
        <meta property="og:title" content="Diego Moreno | Desarrollador Full Stack" />
        <meta property="og:description" content="Portafolio profesional de Diego Moreno..." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Diego Moreno',
              jobTitle: 'Desarrollador Full Stack',
              url: siteUrl,
              sameAs: [
                'https://github.com/DM13250',
                'https://linkedin.com/in/diego-moreno'
              ]
            })
          }}
        />
      </Head>
      
      <Hero />
      <About />
      <Skills />
      <Projects />
    </>
  );
}
```

**Crear:** `src/pages/proyectos/index.tsx` (Projects listing)

```typescript
import Head from 'next/head';
import { GetStaticProps } from 'next';
import ProjectsList from '@/components/ProjectsList';

const siteUrl = 'https://dm13250.netlify.app';

interface ProjectsPageProps {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  // Cargar proyectos desde data/projects.json
  const projects = require('@/data/projects.json').projects;
  
  return {
    props: { projects },
    revalidate: 3600 // ISR: revalidar cada hora
  };
};

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <>
      <Head>
        <title>Proyectos | Diego Moreno</title>
        <meta 
          name="description" 
          content="Catálogo de proyectos profesionales de Diego Moreno. Sitios web, aplicaciones y soluciones tecnológicas." 
        />
        <meta property="og:title" content="Proyectos | Diego Moreno" />
        <meta property="og:url" content={`${siteUrl}/proyectos`} />
        <link rel="canonical" href={`${siteUrl}/proyectos`} />
      </Head>
      
      <ProjectsList projects={projects} />
    </>
  );
}
```

**Crear:** `src/pages/proyectos/[slug].tsx` (Individual project)

```typescript
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import ProjectDetail from '@/components/ProjectDetail';

const siteUrl = 'https://dm13250.netlify.app';

interface ProjectPageProps {
  project: Project;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = require('@/data/projects.json').projects;
  
  const paths = projects.map((project: Project) => ({
    params: { slug: project.slug }
  }));
  
  return {
    paths,
    fallback: 'blocking' // ISR: generar nuevos proyectos bajo demanda
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ 
  params 
}) => {
  const projects = require('@/data/projects.json').projects;
  const project = projects.find((p: Project) => p.slug === params?.slug);
  
  if (!project) {
    return { notFound: true };
  }
  
  return {
    props: { project },
    revalidate: 3600 // ISR
  };
};

export default function ProjectPage({ project }: ProjectPageProps) {
  const pageUrl = `${siteUrl}/proyectos/${project.slug}`;
  
  return (
    <>
      <Head>
        <title>{project.title} | Diego Moreno</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Diego Moreno`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`${siteUrl}/assets/img/projects/${project.image}`} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Product schema para proyectos destacados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: project.title,
              description: project.description,
              image: `${siteUrl}/assets/img/projects/${project.image}`,
              url: pageUrl
            })
          }}
        />
      </Head>
      
      <ProjectDetail project={project} />
    </>
  );
}
```

### 3.3 Crear utilidad para meta tags

**Crear:** `src/lib/seo.ts`

```typescript
interface MetaTags {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl: string;
  canonicalUrl: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export function generateMetaTags(tags: MetaTags) {
  return {
    title: tags.title,
    description: tags.description,
    openGraph: {
      title: tags.ogTitle || tags.title,
      description: tags.ogDescription || tags.description,
      url: tags.ogUrl,
      type: 'website',
      images: tags.ogImage ? [{ url: tags.ogImage }] : []
    },
    twitter: {
      card: tags.twitterCard || 'summary_large_image',
      title: tags.ogTitle || tags.title,
      description: tags.ogDescription || tags.description,
      images: tags.ogImage ? [tags.ogImage] : []
    },
    canonical: tags.canonicalUrl
  };
}
```

---

## Fase 4: Generación de Sitemap y Robots

### 4.1 Generar Sitemap dinámicamente

**Crear:** `src/pages/sitemap.xml.ts`

```typescript
import { GetServerSideProps } from 'next';

const generateSiteMap = (projects: Project[]) => {
  const baseUrl = 'https://dm13250.netlify.app';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <priority>1.0</priority>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>${baseUrl}/sobre-mi</loc>
        <priority>0.8</priority>
        <changefreq>monthly</changefreq>
      </url>
      <url>
        <loc>${baseUrl}/habilidades</loc>
        <priority>0.8</priority>
        <changefreq>monthly</changefreq>
      </url>
      <url>
        <loc>${baseUrl}/proyectos</loc>
        <priority>0.9</priority>
        <changefreq>weekly</changefreq>
      </url>
      ${projects
        .map(({ slug, updatedAt }) => {
          return `
        <url>
          <loc>${baseUrl}/proyectos/${slug}</loc>
          <lastmod>${updatedAt || new Date().toISOString()}</lastmod>
          <priority>0.7</priority>
          <changefreq>monthly</changefreq>
        </url>
      `;
        })
        .join('')}
    </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const projects = require('@/data/projects.json').projects;
  const sitemap = generateSiteMap(projects);
  
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.write(sitemap);
  res.end();
  
  return {
    props: {}
  };
};

const SiteMap = () => null;
export default SiteMap;
```

### 4.2 Robots.txt estático

**Crear:** `public/robots.txt`

```
User-agent: *
Disallow:
Allow: /

Sitemap: https://dm13250.netlify.app/sitemap.xml
Crawl-delay: 1
```

---

## Fase 5: Optimizaciones de Rendimiento

### 5.1 Optimizar imágenes con Next.js Image

**Reemplazar:** `<img>` con `<Image>` de Next.js

```typescript
import Image from 'next/image';

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <Image
        src={`/assets/img/projects/${project.image}`}
        alt={project.title}
        width={400}
        height={225}
        loading="lazy"
        quality={75}
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  );
}
```

### 5.2 next.config.js optimizado

**Crear/actualizar:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitatr imagen remota si es necesario
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compresión y minificación
  compress: true,
  
  // Generación de sitemap (si usas un.plugin)
  // (Alternativamente, usa la ruta /sitemap.xml dinámoca)
  
  // Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // HTML sin caché (revalidación)
      {
        source: '/(.*\\.html)?',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      // Assets con caché largo (porque tienen hash)
      {
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Fase 6: Internacionalización (i18n)

Si necesitas múltiples idiomas, considera usar **next-i18next**:

```bash
npm install next-i18next i18next
```

**Crear:** `next-i18next.config.js`

```javascript
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'home', 'projects'],
  defaultNS: 'common',
};
```

Luego actualizar rutas a: `/es/`, `/en/`, `/es/proyectos/`, etc.

---

## Fase 7: Despliegue en Netlify

### 7.1 Actualizar netlify.toml

```toml
[build]
  command = "next build && next export"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

O mejor aún, usa **@netlify/plugin-nextjs**:

```bash
npm install --save-dev @netlify/plugin-nextjs
```

Y en `netlify.toml`:

```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 7.2 Environment variables (si es necesario)

```
# .env.local
NEXT_PUBLIC_SITE_URL=https://dm13250.netlify.app
```

---

## Fase 8: Validación de SEO

### 8.1 Checklist post-migración

- [ ] Todas las rutas devuelven HTML estático (no app shell)
- [ ] Cada página tiene `<title>` único
- [ ] Cada página tiene `<meta name="description">` unico - [ ] Open Graph tags en todas las páginas principales
- [ ] Canonical tags verificados
- [ ] Sitemap.xml es accesible y válido
- [ ] robots.txt referencia sitemap
- [ ] Structured data (schema.org) presente
- [ ] Core Web Vitals mejoran (Lighthouse)
- [ ] URLs limpias sin hash (#)

### 8.2 Herramientas de validación

```bash
# Lighthouse en CLI
npm install -g lighthouse
lighthouse https://dm13250.netlify.app --view

# Checker de sitemap
# Visita: https://www.xml-sitemaps.com/validate-xml-sitemap.html

# Rich Results Test
# URL: https://search.google.com/test/rich-results
```

### 8.3 Reindexación en Google

1. Acceder a [Google Search Console](https://search.google.com/search-console)
2. Enviar el nuevo sitemap.xml
3. Solicitar una inspección de URL para páginas principales
4. Enviar URLs individuales si es necesario

---

## Comparativa: CSR React vs. SSG Next.js

| Aspecto | React CSR (Actual) | Next.js SSG (Meta) |
|---|---|---|
| HTML inicial | App shell vacío | HTML con contenido real |
| Time to First Byte (TTFB) | Alto (JS + fetch) | Bajo (estático) |
| SEO | Problemas sin JS | Perfecto |
| Compartir en redes | Inconsistente | Preciso (OG) |
| Rendimiento | Depende de JS | Excelente (estático) |
| Escalabilidad | Buena | Muy buena |
| Mantenimiento | Medio | Medio |
| Costo | Bajo (CSR) | Muy bajo (estático) |

---

## Fallback: Pre-rendering sin migrar

Si **no puedes migrar a Next.js ahora**, considera usar **Prerender SPA Plugin** para Netlify:

```bash
npm install --save-dev prerender-spa-plugin
```

Esto genera HTML estático para rutas específicas, mejorando SEO sin cambiar de framework.

---

## Recursos adicionales

- [Next.js SSG Documentation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google JavaScript SEO Guide](https://developers.google.com/search/docs/beginner/javascript-seo-basics)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)

---

## Siguientes pasos

1. **Corto plazo (esta semana):** Validar mejoras actuales con Google Search Console
2. **Mediano plazo (1-2 semanas):** Migración a Next.js
3. **Largo plazo:** Considerar CDN global, Analytics avanzados, blog dinámico

¿Necesitas ayuda con alguna fase específica?
