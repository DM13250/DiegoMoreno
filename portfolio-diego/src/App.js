import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Footer from './components/footer/Footer';
import './App.css';
import './i18n/i18n';

function App() {
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Aplicar el idioma preferido del usuario al cargar
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  // Aplicar tema preferido del usuario al cargar
  useEffect(() => {
    const storedTheme = localStorage.getItem('preferredTheme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkTheme = storedTheme === 'dark' || (storedTheme === null && prefersDarkMode);
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, []);

  // Controlar el scroll y determinar la sección activa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects'];
      
      // Encuentra la sección más cercana al centro de la ventana
      const current = sections.reduce((nearest, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return nearest;
        
        const rect = section.getBoundingClientRect();
        const offset = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        
        return offset < nearest.offset ? { id: sectionId, offset } : nearest;
      }, { id: sections[0], offset: Infinity });
      
      setActiveSection(current.id);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Inicializar
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestión del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = !isSidebarOpen ? 'hidden' : '';
  };

  return (
    <div className="portfolio">
      <Header 
        activeSection={activeSection} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      />
      
      <main className={isSidebarOpen ? 'sidebar-open' : ''}>
        <div>
          <Hero />
        </div>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        {/* Sección de contacto eliminada */}
        
        <Footer />
      </main>
    </div>
  );
}

export default App;
