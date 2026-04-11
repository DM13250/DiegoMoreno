/**
 * StructuredData.jsx - Componente para insertar JSON-LD en el document
 * 
 * Implementa schema.org structuring para mejorar SEO y comprensión de agentes.
 * Ejemplo: Person schema para portfolio personal.
 */

import { useEffect } from 'react';

const PersonSchema = () => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Diego Moreno',
      jobTitle: 'Data Analyst & Web Developer',
      birthDate: '1999-07-15',
      url: 'https://dm13250.netlify.app',
      image: 'https://dm13250.netlify.app/og-image.png',
      email: 'dmr13250@gmail.com',
      description: 'Data Analyst & Web Developer specializing in SAP, Tableau, Django, Ruby on Rails, and Symfony. Based in Daimiel, Ciudad Real, Spain.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Daimiel',
        addressRegion: 'Ciudad Real',
        postalCode: '13250',
        addressCountry: 'ES'
      },
      knowsAbout: [
        'Data Analysis',
        'Backend Development',
        'Web Development',
        'SAP',
        'Tableau',
        'Django',
        'Ruby on Rails',
        'Symfony',
        'PHP',
        'Drupal',
        'WordPress',
        'React',
        'C#',
        'WPF',
        '.NET MAUI',
        'Vanilla JS',
        'Tailwind CSS',
        'PostgreSQL',
        'MySQL',
        'SQL Server',
        'Power Automate',
        'Firebase',
        'Unity',
        'Power BI'
      ],
      sameAs: [
        'https://github.com/dm13250',
        'https://www.linkedin.com/in/dmorenorb/'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Tecnobit - Grupo Oesía',
        url: 'https://www.tecnobit-grupoesia.com',
        logo: 'https://www.tecnobit-grupoesia.com/logo.png'
      },
      jobStartDate: '2025-06-01',
      workLocation: {
        '@type': 'Place',
        name: 'Tecnobit - Grupo Oesía',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ES'
        }
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Personal',
        email: 'dmr13250@gmail.com',
        url: 'https://dm13250.netlify.app/contact'
      }
    };

    let script = document.querySelector('script[type="application/ld+json"][data-schema="person"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'person');
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schema);
  }, []);

  return null;
};

const BreadcrumbSchema = ({ items = [] }) => {
  useEffect(() => {
    if (items.length === 0) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };

    let script = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schema);
  }, [items]);

  return null;
};

export { PersonSchema, BreadcrumbSchema };
