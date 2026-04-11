/**
 * useMetadata.js - Hook personalizado para gestionar metadatos dinámicos por sección
 * 
 * Permite a cada componente (About, Skills, Projects) establecer su propio
 * título, descripción y otros metadatos para mejorar SEO.
 * 
 * Uso:
 * const { setMetadata } = useMetadata();
 * 
 * useEffect(() => {
 *   setMetadata({
 *     title: "Sobre Mí | Diego Moreno",
 *     description: "Conoce mi experiencia...",
 *     url: "https://dm13250.netlify.app/#about"
 *   });
 * }, []);
 */

import { useCallback } from 'react';

export const useMetadata = () => {
  const setMetadata = useCallback(({
    title = 'Diego Moreno | Data Analyst & Web Developer',
    description = 'Data Analyst & Web Developer (Intern) at Tecnobit. Specialized in SAP, Tableau, Django, Ruby on Rails & Symfony.',
    image = '/og-image.png',
    url = 'https://dm13250.netlify.app/',
    type = 'website'
  }) => {
    // Actualizar título del documento
    if (title) {
      document.title = title;
    }

    // Función auxiliar para actualizar meta tags
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

    // Actualizar meta tags básicos
    if (description) {
      updateMetaTag('description', description);
    }

    // Actualizar Open Graph
    if (type) updateMetaTag('og:type', type, true);
    if (title) updateMetaTag('og:title', title, true);
    if (description) updateMetaTag('og:description', description, true);
    if (url) updateMetaTag('og:url', url, true);
    if (image) updateMetaTag('og:image', image, true);

    // Actualizar Twitter Cards
    if (title) updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);

    // Actualizar canonical
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
  }, []);

  return { setMetadata };
};

export default useMetadata;
