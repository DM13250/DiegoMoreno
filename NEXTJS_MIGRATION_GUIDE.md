# Guía de Migración a Next.js - Portfolio Diego Moreno (P2)

## Por Qué Migrar a Next.js

### Problemas de SPA React Puro (CSR - Client-Side Rendering)
1. **SEO Débil**
   - HTML inicial vacío → bots ven `<div id="root"></div>` + JS
   - Google puede renderizar, pero no todos los bots lo hacen
   - Meta tags dinámicos imposibles (cada página iguales)

2. **Social Media Sharing Roto**
   - Twitter/Facebook no ejecutan JS → ven HTML vacío
   - Sin previews ricos en redes sociales

3. **Core Web Vitals Pobres**
   - TTFB Alto (servidor + descarga + parse JS)
   - LCP Alto (depende de que JS se ejecute)
   - CLS inestable (contenido "jumps" cuando carga JS)

4. **Performance**
   - JavaScript grande cargado en cliente
   - Sin hidratación → duplicación de trabajo
   - Sin precarga de datos

### Solución: Next.js App Router (SSG/SSR/ISR)

**Next.js ofrece:**
- ✅ Metadata por ruta (título, description, OG, Twitter Cards)
- ✅ Sitemap automático (`app/sitemap.ts`)
- ✅ Robots.txt automático (`app/robots.ts`)
- ✅ SSG (Static Site Generation) para contenido estático
- ✅ SSR (Server-Side Rendering) para dinámico
- ✅ ISR (Incremental Static Regeneration) para revalidar periódicamente
- ✅ Optimización de imágenes (`next/image`)
- ✅ Compresión automática
- ✅ Soporte completo en Netlify

---

## Arquitectura Propuesta

### URLs (Rutas Limpias)
```
/                      → Home (SSG)
/sobre-mi              → About (SSG)
/proyectos             → Projects list (SSG)
/proyectos/[slug]      → Project detail (SSG con ISR)
/contacto              → Contact (SSR para formulario)
/[...404]              → Custom 404
```

### Estructura de Carpetas Next.js (App Router)
```
src/
├── app/
│   ├── layout.tsx              # Root layout + metadata base
│   ├── page.tsx                # Home
│   ├── sitemap.ts              # Sitemap automático
│   ├── robots.ts               # robots.txt automático
│   ├── (pages)/
│   │   ├── sobre-mi/
│   │   │   └── page.tsx        # Página sobre mí
│   │   ├── proyectos/
│   │   │   ├── page.tsx        # Listado de proyectos
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Detalle de proyecto
│   │   └── contacto/
│   │       └── page.tsx        # Formulario de contacto
│   └── not-found.tsx           # 404 personalizado
├── components/
│   ├── common/              # Componentes reutilizables
│   ├── sections/            # Secciones específicas
│   └── ...
├── lib/
│   ├── metadata.ts          # Funciones de metadata
│   ├── projects.ts          # Data de proyectos
│   └── ...
├── public/
│   ├── assets/
│   ├── og/                  # Imágenes OpenGraph
│   └── ...
└── styles/
    └── ...
```

---

## Plan de Migración (Fase por Fase)

### Fase 1: Preparación (1-2 días)

**1. Crear nuevo proyecto Next.js**
```bash
npx create-next-app@latest portfolio-next --typescript --tailwind
cd portfolio-next
```

**2. Copiar assets necesarios**
```bash
# De portfolio-diego actual a portfolio-next/public
cp -r public/assets portfolio-next/public/
cp -r public/og portfolio-next/public/       # Imágenes OG
cp portfolio-diego/public/favicon.ico portfolio-next/public/
```

**3. Configurar i18n (next-intl)**
```bash
npm install next-intl
```

**Estructura i18n:**
```
messages/
├── es/
│   ├── common.json
│   ├── home.json
│   ├── about.json
│   ├── projects.json
│   └── ...
└── en/
    ├── common.json
    ├── home.json
    ├── about.json
    ├── projects.json
    └── ...
```

**Checklist Fase 1:**
- [ ] `npx create-next-app@latest` con TypeScript + Tailwind
- [ ] Instalar dependencias: `next-intl`, `framer-motion`, `react-i18next`
- [ ] Copiar assets (img, logos)
- [ ] Copiar JSON de traducciones (i18n/locales/)
- [ ] Configurar next.config.js para i18n

---

### Fase 2: Structures Base (2-3 días)

**1. Layout Base con Metadata**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://dm13250.netlify.app'),
  title: {
    template: '%s | Diego Moreno',
    default: 'Diego Moreno | Backend & Data Developer Junior',
  },
  description: 'Desarrollador backend junior especializado en SAP, Tableau, Django y Ruby on Rails.',
  generator: 'Next.js',
  keywords: ['Backend', 'Data', 'SAP', 'Tableau', 'Django', 'Ruby on Rails'],
  creator: 'Diego Moreno',
  authors: [{ name: 'Diego Moreno' }],
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://dm13250.netlify.app',
    siteName: 'Diego Moreno',
    images: [{
      url: 'https://dm13250.netlify.app/og/home-1200x630.jpg',
      width: 1200,
      height: 630,
      alt: 'Diego Moreno - Backend Developer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dmorenorb',
    images: ['https://dm13250.netlify.app/og/home-1200x630.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dm13250.netlify.app',
    languages: {
      'es-ES': 'https://dm13250.netlify.app/es',
      'en-US': 'https://dm13250.netlify.app/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* JSON-LD Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Diego Moreno',
              jobTitle: 'Backend & Data Developer',
              url: 'https://dm13250.netlify.app',
              sameAs: [
                'https://github.com/DM13250',
                'https://linkedin.com/in/dmorenorb',
              ],
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**2. Sitemap Automático**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

async function getSitemap(): Promise<MetadataRoute.Sitemap> {
  // Aquí puedes obtener proyectos de una BD o archivo
  const projects = [
    // { slug: 'proyecto-1', modified: '2026-04-11' },
    // ...
  ];

  return [
    {
      url: 'https://dm13250.netlify.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://dm13250.netlify.app/sobre-mi',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://dm13250.netlify.app/proyectos',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projects.map(p => ({
      url: `https://dm13250.netlify.app/proyectos/${p.slug}`,
      lastModified: new Date(p.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}

export default getSitemap;
```

**3. Robots.txt Automático**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://dm13250.netlify.app/sitemap.xml',
  };
}
```

**Checklist Fase 2:**
- [ ] Crear `app/layout.tsx` con metadata completa
- [ ] Crear `app/sitemap.ts`
- [ ] Crear `app/robots.ts`
- [ ] Crear estructura de carpetas (pages/)
- [ ] Instalar y configurar dependencias (i18n, framer-motion, etc.)

---

### Fase 3: Migración de Páginas (3-5 días)

**1. Home Page (`app/page.tsx`)**

```typescript
// app/page.tsx
import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import { generateMetadata as generateBaseMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Diego Moreno | Backend & Data Developer Junior',
  description: 'Explorar mi experiencia en desarrollo backend, SAP, Tableau y gestión de datos.',
  url: 'https://dm13250.netlify.app',
  image: 'https://dm13250.netlify.app/og/home-1200x630.jpg',
});

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

**2. Página Sobre Mí (`app/(pages)/sobre-mi/page.tsx`)**

```typescript
// app/(pages)/sobre-mi/page.tsx
import type { Metadata } from 'next';
import About from '@/components/sections/About';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Sobre Mí | Diego Moreno - Desarrollador Backend',
  description: 'Conoce mi experiencia, formación y especialización en desarrollo backend, SAP y análisis de datos.',
  url: 'https://dm13250.netlify.app/sobre-mi',
  image: 'https://dm13250.netlify.app/og/about-1200x630.jpg',
});

export default function AboutPage() {
  return <About />;
}
```

**3. Listado de Proyectos (`app/(pages)/proyectos/page.tsx`)**

```typescript
// app/(pages)/proyectos/page.tsx
import type { Metadata } from 'next';
import Projects from '@/components/sections/Projects';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Proyectos | Portfolio de Diego Moreno',
  description: 'Proyectos destacados con React, Drupal, Django, Ruby on Rails y más. Trabajo profesional y académico.',
  url: 'https://dm13250.netlify.app/proyectos',
  image: 'https://dm13250.netlify.app/og/projects-1200x630.jpg',
});

export default function ProjectsPage() {
  return <Projects />;
}
```

**4. Detalle de Proyecto (`app/(pages)/proyectos/[slug]/page.tsx`)**

```typescript
// app/(pages)/proyectos/[slug]/page.tsx
import type { Metadata } from 'next';
import ProjectDetail from '@/components/sections/ProjectDetail';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';

export const revalidate = 3600; // ISR: revalidar cada hora

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: 'Proyecto no encontrado' };

  return {
    title: `${project.title} | Proyecto de Diego Moreno`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: `https://dm13250.netlify.app/proyectos/${slug}`,
      images: [`https://dm13250.netlify.app/og/${slug}-1200x630.jpg`],
    },
    alternates: {
      canonical: `https://dm13250.netlify.app/proyectos/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return <ProjectDetail project={project} />;
}
```

**Helper: Función de Metadata**

```typescript
// lib/metadata.ts
import type { Metadata } from 'next';

interface MetadataInput {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
}

export function generateMetadata(input: MetadataInput): Metadata {
  const {
    title,
    description,
    url,
    image = 'https://dm13250.netlify.app/og/default-1200x630.jpg',
    author = 'Diego Moreno',
  } = input;

  return {
    title,
    description,
    creator: author,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
```

**Checklist Fase 3:**
- [ ] Crear `app/page.tsx` (home)
- [ ] Crear `app/(pages)/sobre-mi/page.tsx`
- [ ] Crear `app/(pages)/proyectos/page.tsx`
- [ ] Crear `app/(pages)/proyectos/[slug]/page.tsx` con ISR
- [ ] Crear `lib/metadata.ts` (helper de metadata)
- [ ] Crear `lib/projects.ts` (funciones para obtener proyectos)
- [ ] Migrar componentes sección (Hero, About, Skills, Projects)

---

### Fase 4: Optimización + Despliegue (2-3 días)

**1. Configuración Next.js Optimizada**

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
```

**2. GitHub Workflow para Tests Automáticos** (opcional)

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**3. Netlify Deployment Config**

```toml
# netlify.toml (actualizado para Next.js)
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/sitemap.xml"
  to = "/.netlify/functions/sitemap"

[functions]
  directory = "netlify/functions"
```

**Checklist Fase 4:**
- [ ] Crear `next.config.js` optimizado
- [ ] Crear `netlify.toml` para Next.js
- [ ] Instalar dependencias faltantes
- [ ] Ejecutar `npm run build` sin errores
- [ ] Probar localmente: `npm run dev`
- [ ] Medir Lighthouse
- [ ] Desplegar en Netlify

---

## Comparación: Antes vs Después

### SEO
| Métrica | React SPA | Next.js SSG |
|---------|----------|------------|
| Indexabilidad | Depende de Google render | ✅ HTML completo |
| Meta tags | Dinámicos solo en JS | ✅ En HTML inicial |
| Titles únicos | No (todos iguales) | ✅ Por ruta |
| OG/Twitter | Con delay | ✅ Listo en <head> |
| Sitemap | Estático manual | ✅ Automático |
| Robots.txt | Estático manual | ✅ Automático |

### Performance
| Métrica | React SPA | Next.js SSG |
|---------|----------|------------|
| TTFB | Alto (Js load) | ✅ Muy bajo |
| LCP | Alto (2-4s) | ✅ <2.5s |
| CLS | Variable | ✅ Estable |
| INP | Depende JS | ✅ Rápido |

### Social
| Métrica | React SPA | Next.js |
|---------|----------|--------|
| Twitter Card preview | Vacío/genérico | ✅ Personalizado |
| Facebook OG | Vacío/genérico | ✅ Personalizado |
| WhatsApp preview | Vacío | ✅ Con imagen |

---

## Referencias y Recursos

### Documentación Oficial
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

### Ejemplos Reales
- [Next.js Portfolio Templates](https://vercel.com/templates?type=portfolio)
- [Next.js App Router Examples](https://github.com/vercel/next.js/tree/canary/examples)

### Migración
- [Next.js SSR to SSG Migration](https://nextjs.org/docs/pages/building-your-application/rendering/static-generation)
- [CSR to SSG Best Practices](https://web.dev/static-rendering/)

---

## Resumen

### Pasos Claves
1. ✅ Crear novo proyecto Next.js
2. ✅ Migrar componentes (Hero, About, Skills, Projects)
3. ✅ Configurar metadata por ruta
4. ✅ Crear páginas específicas
5. ✅ Optimizar imágenes
6. ✅ Desplegar en Netlify

### Beneficios Post-Migración
- ✅ SEO mejorado (scores Lighthouse 90+)
- ✅ Social sharing funcional
- ✅ Performance optimizado (LCP <2s)
- ✅ URLs limpias y crawlables
- ✅ Sitemap automático
- ✅ Revalidación dinámica (ISR)

### Timeline Estimado
- **Total: 2-4 semanas** (trabajando part-time)
- Fase 1: 1-2 días
- Fase 2: 2-3 días
- Fase 3: 3-5 días
- Fase 4: 2-3 días
- Buffer/Testing: 3-5 días

---

**Siguientes pasos:** Ejecutar Fase 1 (Preparación) una vez aprobada la estrategia.
