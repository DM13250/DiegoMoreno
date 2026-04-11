/**
 * MetaTags.jsx - Componente para gestionar metadata dinámicamente
 * 
 * Actualiza el título del documento y meta tags en el head
 * para mejorar SEO y social media previews.
 * 
 * Uso:
 * <MetaTags 
 *   title="Título de la página"
 *   description="Descripción de la página"
 *   image="/og/imagen.jpg"
 *   url="https://dm13250.netlify.app/seccion"
 * />
 */

import { useEffect } from 'react';

const MetaTags = ({
  title = 'Diego Moreno | Data Analyst & Web Developer',
  description = 'Data Analyst & Web Developer (Intern) at Tecnobit. Specialized in SAP, Tableau, Django, Ruby on Rails & Symfony. Portfolio showcasing data analysis and web development projects.',
  image = '/og-image.png',
  url = 'https://dm13250.netlify.app/',
  type = 'website',
  author = 'Diego Moreno',
  locale = 'es_ES'
}) => {
  useEffect(() => {
    // Actualizar título del documento
    document.title = title;

    // Actualizar o crear meta tags
    const updateMetaTag = (name, value, property = false) => {
      let tag = property
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // Meta tags básicos
    updateMetaTag('description', description);
    updateMetaTag('author', author);

    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:type', 'image/png', true);
    updateMetaTag('og:site_name', 'Diego Moreno Portfolio', true);
    updateMetaTag('og:locale', locale, true);

    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical (siempre la URL actual)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Scroll al top cuando cambia la metadata (mejor UX)
    window.scrollTo(0, 0);
  }, [title, description, image, url, type, author, locale]);

  return null; // Este componente solo gestiona el head, no renderiza nada
};

export default MetaTags;
