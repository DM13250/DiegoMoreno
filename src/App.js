/**
 * App.js - Componente principal de la aplicación
 * 
 * Este archivo contiene el componente principal que estructura toda la aplicación.
 * Incluye la navegación, las diferentes secciones y el footer.
 * También maneja la lógica de cambio de tema (claro/oscuro) y la internacionalización.
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Footer from './components/footer/Footer';
import './App.css';
import './i18n/i18n';

// Code-splitting: lazy load componentes grandes que no son above-the-fold
const About = lazy(() => import('./components/about/About'));
const Skills = lazy(() => import('./components/skills/Skills'));
const Projects = lazy(() => import('./components/projects/Projects'));

// Componente de fallback mientras se cargan los componentes
const SectionFallback = () => (
  <div style={{ 
    minHeight: '500px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    opacity: 0.5
  }}>
    <p>Cargando...</p>
  </div>
);

function App() {
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Custom Circle Cursor
  useEffect(() => {
    const cursor = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    cursor.className = 'cursor';
    cursorInner.className = 'cursor-inner';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorInner);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    const speed = 0.1; // Suavidad del seguimiento
    
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      cursorInner.style.left = mouseX + 'px';
      cursorInner.style.top = mouseY + 'px';
      
      requestAnimationFrame(updateCursor);
    };
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Click effect
    window.addEventListener('mousedown', () => {
      cursor.classList.add('click');
      cursorInner.classList.add('click');
    });
    
    window.addEventListener('mouseup', () => {
      cursor.classList.remove('click');
      cursorInner.classList.remove('click');
    });
    
    updateCursor();
    
    return () => {
      cursor.remove();
      cursorInner.remove();
    };
  }, []);

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
      
      // Scroll Indicator Progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        scrollIndicator.style.width = scrolled + '%';
      }
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
      <div className="scroll-indicator"></div>
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
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </section>
        
        <section id="skills">
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </section>
        
        <section id="projects">
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </section>
        
        {/* Sección de contacto eliminada */}
        
        <Footer />
      </main>
    </div>
  );
}

export default App;
