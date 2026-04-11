/**
 * Projects.jsx - Componente de Proyectos
 * 
 * Este componente muestra una cuadrícula de proyectos con:
 * - Filtrado por categoría
 * - Animaciones de entrada
 * - Diseño responsive
 * - Carga progresiva de proyectos
 * - Modal para ver detalles del proyecto
 * - Imágenes optimizadas con lazy loading
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useMetadata from '../../hooks/useMetadata';
import ProjectModal from './ProjectModal';
import './Projects.css';

// Importación de imágenes
import consum from '../../assets/img/projects/consum.png';
import benidorm from '../../assets/img/projects/benidorm.png';
import caballero from '../../assets/img/projects/caballero.svg';
import portfolio from '../../assets/img/projects/Portfolio.PNG';
import garciaBaquero from '../../assets/img/projects/garciaVaquero.png';
import mejorAppT from '../../assets/img/projects/mejorAppT.PNG';
import gicoop from '../../assets/img/projects/gicoop.svg';
import daimiel from '../../assets/img/projects/daimiel.svg';
import proyectoMia from '../../assets/img/projects/proyectoMia.PNG';
import abacid from '../../assets/img/projects/abacid.png';
import fundacionhm from '../../assets/img/projects/funcionhm.png';
import moscas from '../../assets/img/projects/moscas.PNG';
import frozen from '../../assets/img/projects/frozen.PNG';

// Objeto con las imágenes
const projectImages = {
  consum,
  benidorm,
  caballero,
  portfolio,
  mejorAppT,
  garciaBaquero,
  gicoop,
  daimiel,
  proyectoMia,
  abacid,
  fundacionhm,
  moscas,
  frozen
};

const Projects = () => {
  const { t } = useTranslation();
  const { setMetadata } = useMetadata();
  const [filter, setFilter] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Actualizar metadatos cuando la sección se carga
  useEffect(() => {
    setMetadata({
      title: `${t('projects.title')} | Diego Moreno`,
      description: t('projects.description'),
      url: 'https://dm13250.netlify.app/#projects'
    });
  }, [t, setMetadata]);
  
  // Datos de proyectos
  const projects = [
    {
      id: 1,
      key: 'benidorm',
      category: 'drupal',
      image: projectImages.benidorm,
      technologies: ['Drupal 8', 'PHP', 'jQuery', 'CSS', 'MySQL'],
      liveUrl: 'https://www.benidorm.org',
      githubUrl: '',
      featured: true
    },
    {
      id: 2,
      key: 'daimiel',
      category: 'drupal',
      image: projectImages.daimiel,
      technologies: ['Drupal 8', 'PHP', 'jQuery', 'SASS', 'MySQL'],
      liveUrl: 'https://www.daimiel.es',
      githubUrl: '',
      featured: true
    },
    {
      id: 3,
      key: 'portfolio',
      category: 'react',
      image: projectImages.portfolio,
      technologies: ['React', 'CSS', 'JavaScript','HTML'],
      liveUrl: 'https://eldiegomoreno.netlify.app/',
      githubUrl: 'https://github.com/DM13250/DiegoMoreno',
      featured: true
    },
    {
      id: 4,
      key: 'proyectoMia',
      category: 'wpf',
      image: projectImages.proyectoMia,
      technologies: ['WPF', 'C#', 'MVVM', 'XAML'],
      githubUrl: 'https://github.com/DM13250/Proyecto-MIA',
      featured: true
    },
    {
      id: 5,
      key: 'mejorAppT',
      category: 'maui',
      image: projectImages.mejorAppT,
      technologies: ['Maui', 'MVVM', 'XAML'],
      githubUrl: 'https://github.com/angelcaballero-iesgp/MejorAppTG2',
      featured: true
    },
    {
      id: 6,
      key: 'consum',
      category: 'drupal',
      image: projectImages.consum,
      technologies: ['Drupal 9', 'PHP', 'JavaScript', 'API REST', 'SASS'],
      liveUrl: 'https://www.consum.es',
      githubUrl: '',
      featured: false
    },
    {
      id: 7,
      key: 'hm',
      category: 'drupal',
      image: projectImages.fundacionhm,
      technologies: ['Drupal 7/8', 'PHP', 'JavaScript', 'CSS', 'jQuery'],
      liveUrl: 'https://www.fundacionhm.com/',
      githubUrl: '',
      featured: false
    },
    {
      id: 8,
      key: 'frozen',
      category: 'unity',
      image: projectImages.frozen,
      technologies: ['Unity', 'C#'],
      githubUrl: 'https://github.com/DM13250/Frozen-Unity',
      featured: false
    },
    {
      id: 9,
      key: 'edificaciones',
      category: 'drupal',
      image: projectImages.caballero,
      technologies: ['Drupal 8', 'PHP', 'jQuery', 'CSS', 'MySQL'],
      liveUrl: 'https://www.edificacionescaballero.es',
      githubUrl: '',
      featured: false
    },
    {
      id: 10,
      key: 'garciaBaquero',
      category: 'wordpress',
      image: projectImages.garciaBaquero,
      technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'MySQL'],
      liveUrl: 'https://www.garciabaquero.com',
      githubUrl: '',
      featured: false
    },
    {
      id: 11,
      key: 'apocalipsisMoscas',
      category: 'unity',
      image: projectImages.moscas,
      technologies: ['Unity', 'C#'],
      githubUrl: 'https://github.com/DM13250/Apocalipsis-Moscas-Unity',
      featured: true
    },
    {
      id: 12,
      key: 'gicoop',
      category: 'wpf',
      image: projectImages.gicoop,
      technologies: ['WPF', 'C#', 'MySql', 'XAML', 'Crystal Reports'],
      featured: false
    },
    {
      id: 13,
      key: 'abacid',
      category: 'drupal',
      image: projectImages.abacid,
      technologies: ['Drupal 8', 'PHP', 'JavaScript', 'CSS', 'MySQL'],
      liveUrl: 'https://www.abacid.es',
      githubUrl: '',
      featured: false
    }
  ];
  
  // Filtrado de proyectos
  const filteredProjects = filter === 'all' 
    ? [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      })
    : projects.filter(project => project.category === filter);

  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMoreProjects = displayCount < filteredProjects.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  // Manejar apertura del modal
  const handleOpenModal = useCallback((project) => {
    setSelectedProjectId(project.id);
  }, []);

  // Manejar cierre del modal
  const handleCloseModal = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(6);
  }, [filter]);

  // Animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const projectVariants = {
    hidden: {
      y: 30
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-title">
          <motion.h2
            initial={{ y: -10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="section-title"
          >
            {t('projects.title')}
          </motion.h2>
          <p className="section-subtitle">{t('projects.description')}</p>
        </div>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('projects.filters.all')}
          </button>
          <button
            className={`filter-btn ${filter === 'drupal' ? 'active' : ''}`}
            onClick={() => setFilter('drupal')}
          >
            {t('projects.filters.drupal')}
          </button>
          <button
            className={`filter-btn ${filter === 'wordpress' ? 'active' : ''}`}
            onClick={() => setFilter('wordpress')}
          >
            {t('projects.filters.wordpress')}
          </button>
          <button
            className={`filter-btn ${filter === 'react' ? 'active' : ''}`}
            onClick={() => setFilter('react')}
          >
            {t('projects.filters.react')}
          </button>
          <button
            className={`filter-btn ${filter === 'unity' ? 'active' : ''}`}
            onClick={() => setFilter('unity')}
          >
            {t('projects.filters.unity')}
          </button>
          <button
            className={`filter-btn ${filter === 'wpf' ? 'active' : ''}`}
            onClick={() => setFilter('wpf')}
          >
            {t('projects.filters.wpf')}
          </button>
          <button
            className={`filter-btn ${filter === 'maui' ? 'active' : ''}`}
            onClick={() => setFilter('maui')}
          >
            {t('projects.filters.maui')}
          </button>
        </div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayedProjects.map(project => (
            <div
              className="project-card" 
              key={project.id}
              onClick={() => handleOpenModal(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal(project);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              aria-label={`Ver detalles de ${t(`projects.items.${project.key}.title`)}`}
            >
              <motion.div
                variants={projectVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={t(`projects.items.${project.key}.title`)}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="225"
                  />
                  {project.featured && <span className="featured-badge">{t('projects.common.featured')}</span>}
                </div>
                
                <div className="project-card-footer">
                  <h3 className="project-card-title">{t(`projects.items.${project.key}.title`)}</h3>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {hasMoreProjects && (
          <motion.div
            className="load-more-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              className="load-more-btn" 
              onClick={handleLoadMore}
              aria-label={t('projects.common.loadMore')}
              type="button"
            >
              {t('projects.common.loadMore')}
              <FontAwesomeIcon icon={faChevronDown} className="load-more-icon" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal para ver detalles del proyecto */}
      <ProjectModal
        isOpen={selectedProjectId !== null}
        project={selectedProjectId ? projects.find(p => p.id === selectedProjectId) : null}
        onClose={handleCloseModal}
        t={t}
      />
    </section>
  );
};

export default Projects; 