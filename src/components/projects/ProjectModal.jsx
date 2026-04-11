/**
 * ProjectModal.jsx - Modal para detalles de proyecto
 * 
 * Muestra los detalles completos del proyecto:
 * - Imagen grande del proyecto
 * - Título y descripción
 * - Tecnologías usadas
 * - Enlaces a sitio web y GitHub
 * - Cierre al hacer click fuera o presionar ESC
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, project, onClose, t }) => {
  // Escuchar ESC para cerrar modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (!isOpen) {
      return;
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // No renderizar nada si modal no está abierto
  if (!isOpen || !project) {
    return null;
  }

  return (
    <motion.div 
      className="modal-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop oscuro */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Contenedor del modal */}
      <motion.div
        className="modal-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar modal"
          title="Cerrar (ESC)"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Contenido del modal */}
        <div className="modal-content">
          {/* Imagen del proyecto */}
          <div className="modal-image-container">
            <img
              src={project.image}
              alt={t(`projects.items.${project.key}.title`)}
              className="modal-image"
              decoding="async"
            />
            {project.featured && (
              <span className="modal-featured-badge">
                {t('projects.common.featured')}
              </span>
            )}
          </div>

          {/* Información del proyecto */}
          <div className="modal-info">
            <h2 className="modal-title">
              {t(`projects.items.${project.key}.title`)}
            </h2>

            {/* Descripción principal */}
            <p className="modal-description">
              {t(`projects.items.${project.key}.description`)}
            </p>

            {/* Descripción detallada si existe */}
            {t(`projects.items.${project.key}.detailedDescription`, { returnObjects: true }) !== `projects.items.${project.key}.detailedDescription` && (
              <p className="modal-detailed-description">
                {t(`projects.items.${project.key}.detailedDescription`)}
              </p>
            )}

            {/* Tecnologías */}
            <div className="modal-tech-section">
              <h3 className="modal-section-title">
                {t('projects.common.technologies')}
              </h3>
              <div className="modal-tech-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="modal-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Enlaces */}
            <div className="modal-links-section">
              <h3 className="modal-section-title">
                {t('projects.common.links')}
              </h3>
              <div className="modal-links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link-btn modal-link-website"
                    title={t('projects.common.viewWebsite')}
                    aria-label={`${t(`projects.items.${project.key}.title`)} - ${t('projects.common.viewWebsite')}`}
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                    <span>{t('projects.common.viewWebsite')}</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link-btn modal-link-github"
                    title={t('projects.common.viewGithub')}
                    aria-label={`${t(`projects.items.${project.key}.title`)} - ${t('projects.common.viewGithub')}`}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    <span>{t('projects.common.viewGithub')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
