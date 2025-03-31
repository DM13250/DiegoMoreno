/**
 * Footer.jsx - Componente de Pie de Página
 * 
 * Este componente muestra el pie de página de la aplicación con:
 * - Información de contacto
 * - Enlaces de navegación
 * - Enlaces a redes sociales
 * - Animación de ondas
 * - Diseño responsive
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import navigationConfig from '../../config/navigationConfig';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave">
        {/* Primera capa de ondas - más suave y ligera */}
        <svg className="waves wave1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
        
        {/* Segunda capa de ondas - un poco más pronunciada */}
        <svg className="waves wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"></path>
        </svg>
        
        {/* Tercera capa de ondas - la más definida */}
        <svg className="waves wave3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">
              <h2>Diego Moreno</h2>
              <div className="footer-tagline">
                <FontAwesomeIcon icon={faCode} className="tagline-icon" />
                <p>{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="footer-navigation">
            <h3>{t('footer.navigation')}</h3>
            <div className="footer-links">
              {navigationConfig && navigationConfig.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {t(`nav.${item.id}`)}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-contact">
            <h3>{t('footer.contacto')}</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>dmr13250@gmail.com</p>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <p>Daimiel (Ciudad Real), España</p>
              </div>
            </div>
            <div className="social-links">
              <a 
                href="https://github.com/DM13250" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a 
                href="https://www.linkedin.com/in/dm13250/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Diego Moreno. {t('footer.derechos')}</p>
          <p className="made-with">
            {t('footer.hecho')} <FontAwesomeIcon icon={faCode} /> & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 