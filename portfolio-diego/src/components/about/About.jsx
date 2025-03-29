import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faBirthdayCake, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faBriefcase 
} from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  // Animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 20
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
    <section className="about-section" id="about-me">
      <div className="container about-container">
        <div className="about-title">
          <motion.h2
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {t('about.title')}
          </motion.h2>
          <div className="underline"></div>
          <p className="section-subtitle">
            {t('about.description')}
          </p>
        </div>

        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="about-text"
            variants={itemVariants}
          >
            <p>
              {t('about.parrafo1')}
            </p>
            <p>
              {t('about.parrafo2')}
            </p>
            <p>
              {t('about.parrafo3')}
            </p>
            <p>
              {t('about.parrafo4')}
            </p>
            
            <div className="cv-download">
              <a href="/assets/CV Diego Moreno Rodríguez Barbero.pdf" className="download-btn" download>
                <FontAwesomeIcon icon={faDownload} />
                {t('about.descargarCV')}
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-info"
            variants={itemVariants}
          >
            <h3>{t('about.datosPersonales')}</h3>
            <ul className="info-list">
              <li>
                <FontAwesomeIcon icon={faBirthdayCake} />
                <span className="info-title">{t('about.cumpleanos')}:</span>
                <span>{t('about.fechaCumpleanos')}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="info-title">Email:</span>
                <span>{t('about.email')}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span className="info-title">{t('about.direccion')}:</span>
                <span>{t('about.ubicacion')}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faBriefcase} />
                <span className="info-title">{t('about.cargo')}:</span>
                <span>{t('about.puesto')}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 