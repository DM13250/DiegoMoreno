import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUser, 
  faCode, 
  faBriefcase, 
  faEnvelope, 
  faSun, 
  faMoon, 
  faCircle 
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import navigationConfig from '../../config/navigationConfig';
import './Header.css';

const Header = ({ activeSection, isSidebarOpen, toggleSidebar }) => {
  const { t, i18n } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return document.documentElement.classList.contains('dark-theme');
  });
  const [isScrolled, setIsScrolled] = useState(false);

  // Aplicar el tema al montar el componente
  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, []);

  // Controlar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cambiar idioma
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  // Cambiar tema
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.documentElement.classList.toggle('dark-theme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('preferredTheme', newTheme ? 'dark' : 'light');
  };

  // Desplazamiento suave a secciones
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Si el menú está abierto en móvil, cerrarlo
      if (window.innerWidth < 768 && isSidebarOpen) {
        toggleSidebar();
      }
    }
  };

  // Renderizar icono según el nombre
  const renderIcon = (sectionId) => {
    switch (sectionId) {
      case 'home':
        return <FontAwesomeIcon icon={faHome} />;
      case 'about':
        return <FontAwesomeIcon icon={faUser} />;
      case 'skills':
        return <FontAwesomeIcon icon={faCode} />;
      case 'projects':
        return <FontAwesomeIcon icon={faBriefcase} />;
      default:
        return <FontAwesomeIcon icon={faCircle} />;
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-container">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }} 
              className="logo"
            >
              DM
            </a>
          </div>
          
          <button 
            className={`menu-toggle ${isSidebarOpen ? 'active' : ''}`} 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">DM</div>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-links">
            {navigationConfig.map(item => (
              <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
                <a 
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  <span className="nav-icon">{renderIcon(item.id)}</span>
                  <span className="nav-label">{item.label[i18n.language] || item.label.en}</span>
                  {activeSection === item.id && <span className="active-indicator"></span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-actions">
          <div className="language-switcher">
            <button 
              className={i18n.language === 'es' ? 'active' : ''} 
              onClick={() => changeLanguage('es')}
            >
              Español
            </button>
            <button 
              className={i18n.language === 'en' ? 'active' : ''} 
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
          >
            {isDarkTheme ? (
              <>
                <FontAwesomeIcon icon={faSun} />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMoon} />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>
          
          <div className="social-links">
            <a href="https://github.com/DM13250" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://linkedin.com/in/dm13250" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 