import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
import { useTranslation } from 'react-i18next';

// Importar las imágenes
import drupalIcon from '../../assets/img/technologies/drupal.png';
import javaIcon from '../../assets/img/technologies/java.png';
import jqueryIcon from '../../assets/img/technologies/jquery.png';
import html5Icon from '../../assets/img/technologies/html5.png';
import css3Icon from '../../assets/img/technologies/css3.png';
import phpIcon from '../../assets/img/technologies/Php.png';
import mauiIcon from '../../assets/img/technologies/Maui.png';
import wpfIcon from '../../assets/img/technologies/wpf.png';
import postmanIcon from '../../assets/img/technologies/postman.svg';
import mysqlIcon from '../../assets/img/technologies/mysql.png';
import mongodbIcon from '../../assets/img/technologies/mongodb.svg';
import firebaseIcon from '../../assets/img/technologies/firebase.svg';
import reactIcon from '../../assets/img/technologies/react.png';
import dockerIcon from '../../assets/img/technologies/docker.png';
import gitIcon from '../../assets/img/technologies/git.png';
import javaScriptIcon from '../../assets/img/technologies/javascript.png';

const Skills = () => {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  
  const skillsData = [
    { name: 'React', icon: reactIcon },
    { name: 'JavaScript', icon: javaScriptIcon },
    { name: 'HTML5', icon: html5Icon },
    { name: 'CSS3', icon: css3Icon },
    { name: 'MongoDB', icon: mongodbIcon },
    { name: 'Firebase', icon: firebaseIcon },
    { name: 'Git', icon: gitIcon },
    { name: 'Docker', icon: dockerIcon },
    { name: 'Postman', icon: postmanIcon },
    { name: 'PHP', icon: phpIcon },
    { name: 'Drupal', icon: drupalIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'Java', icon: javaIcon },
    { name: 'jQuery', icon: jqueryIcon },
    { name: 'MAUI', icon: mauiIcon },
    { name: 'WPF', icon: wpfIcon },
  ];

  // Duplicamos los elementos para lograr el efecto de bucle infinito
  const duplicatedSkills = [...skillsData, ...skillsData];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval;
    
    // Función para iniciar el desplazamiento automático
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft >= (carousel.scrollWidth / 2 - 10)) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1;
        }
      }, 20);
    };

    // Función para detener el desplazamiento
    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    // Iniciar el desplazamiento al cargar
    startScroll();

    // Pausar cuando el mouse está encima
    carousel.addEventListener('mouseenter', stopScroll);
    carousel.addEventListener('mouseleave', startScroll);

    // Limpiar eventos al desmontar
    return () => {
      stopScroll();
      carousel.removeEventListener('mouseenter', stopScroll);
      carousel.removeEventListener('mouseleave', startScroll);
    };
  }, []);

  return (
        <motion.div 
          className="skills-carousel-container"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="skills-carousel" ref={carouselRef}>
            {duplicatedSkills.map((skill, index) => (
              <motion.div 
                className="skill-item"
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <img src={skill.icon} alt={skill.name} className="skill-icon" />
                <div className="skill-name">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
  );
};

export default Skills; 