import React from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-greeting">{t('hero.greeting')}</span>
          <h1 className="hero-title">{t('hero.title')}</h1>
          <h2 className="hero-role">{t('hero.subtitle')}</h2>
          <p className="hero-description">{t('hero.description')}</p>
          
          <div className="hero-cta">
            <button 
              className="primary-button" 
              onClick={scrollToProjects}
            >
              {t('hero.cta')}
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              {/* Puedes añadir una imagen de perfil aquí si lo deseas */}
              {/* <img src="/assets/profile.jpg" alt="Diego Moreno" className="hero-profile-image" /> */}
            </div>
          </div>
          <div className="hero-background"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 