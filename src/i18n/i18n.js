import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Recursos de traducción
const resources = {
  es: {
    translation: {
      // Navegación
      'nav.home': 'Inicio',
      'nav.about': 'Sobre Mí',
      'nav.skills': 'Habilidades',
      'nav.projects': 'Proyectos',
      
      // Hero
      'hero.greeting': '¡Hola! Soy',
      'hero.title': 'Diego Moreno',
      'hero.subtitle': 'Desarrollador Web',
      'hero.description': 'Creando experiencias digitales elegantes y funcionales',
      'hero.cta': 'Ver Proyectos',
      
      // Sobre Mí
      'about.title': 'Sobre Mí',
      'about.description': 'Conoce un poco más sobre mí, mi experiencia y mi pasión por el desarrollo web.',
      'about.parrafo1': 'Soy desarrollador web con un enfoque especial en Drupal, Symfony y C#. Desde 2019 me dedico a crear aplicaciones eficientes, escalables y que realmente aportan valor a las empresas.',
      'about.parrafo2': 'Me apasiona resolver problemas, optimizar procesos y transformar ideas en soluciones digitales funcionales e innovadoras. Me encanta mantenerme en constante aprendizaje, buscando nuevas herramientas y formas de hacer las cosas mejor.',
      'about.parrafo3': 'He trabajado en proyectos que van desde plataformas web avanzadas para supermercados hasta herramientas críticas para administraciones públicas y hospitales. Siempre con el objetivo de garantizar rendimiento, accesibilidad y seguridad.',
      'about.parrafo4': 'Si buscas a alguien proactivo, con ganas de nuevos retos y capaz de llevar tus ideas al siguiente nivel, ¡aquí estoy para hablar!',
      'about.experience': 'Años de Experiencia',
      'about.projects': 'Proyectos Completados',
      'about.clients': 'Clientes Satisfechos',
      'about.cumpleanos': 'Cumpleaños',
      'about.direccion': 'Dirección',
      'about.cargo': 'Cargo',
      'about.descargarCV': 'Descargar CV',
      'about.datosPersonales': 'Datos Personales',
      'about.fechaCumpleanos': '15 de Julio, 1999',
      'about.email': 'dmr13250@gmail.com',
      'about.ubicacion': 'Daimiel (Ciudad Real), España',
      'about.puesto': 'Desarrollador Web Full-Stack',
      
      // Habilidades
      'skills.title': 'Mis Habilidades',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Herramientas',
      
      // Proyectos
      'projects.title': 'Proyectos',
      'projects.description': 'Una selección de mis trabajos más destacados',
      'projects.filters.all': 'Todos',
      'projects.filters.drupal': 'Drupal',
      'projects.filters.wordpress': 'WordPress',
      'projects.filters.angular': 'Angular',
      'projects.filters.react': 'React',
      'projects.filters.csharp': 'C#',
      'projects.filters.unity': 'Unity',
      'projects.filters.wpf': 'WPF',
      'projects.filters.maui': 'MAUI',
      'projects.items.abacid.title': 'Abacid',
      'projects.items.abacid.description': 'El sitio web de ABACID, ofrece información sobre pruebas de laboratorio enfocadas en nutrición, salud y bienestar, estudios genéticos y consultas especializadas. Los usuarios pueden adquirir pruebas como el diagnóstico molecular de alergias, análisis de intolerancias alimentarias y cribados prenatales no invasivos, con la opción de realizarlas desde casa o en centros colaboradores. Además, el portal proporciona detalles sobre cada prueba, instrucciones para su realización y acceso a resultados en línea. También se incluyen recursos informativos y datos de contacto para resolver dudas o solicitar asesoramiento.',
      'projects.items.apocalipsisMoscas.title': 'Juego VR en Unity',
      'projects.items.apocalipsisMoscas.description': 'Enfréntate a la invasión de moscas y pon a prueba tus reflejos mientras usas diferentes armas para acabar con ellas. Pero cuidado, ¡no debes golpear a las avispas! Sobrevive al desafío y demuestra tu habilidad en este divertido y frenético juego.',
      'projects.items.benidorm.title': 'Ayuntamiento de Benidorm',
      'projects.items.benidorm.description': 'Portal multisite oficial de Benidorm, que ofrece noticias actualizadas, información sobre política local, servicios municipales y una agenda destacada de eventos y actividades.',
      'projects.items.consum.title': 'Consum',
      'projects.items.consum.description': '​El sitio web oficial de Consum, ofrece información detallada sobre la cooperativa valenciana de distribución alimentaria. Los usuarios pueden acceder a la tienda en línea para realizar compras, localizar supermercados cercanos y explorar oportunidades laborales en la sección "Trabaja con nosotros". Además, el portal proporciona recursos como recetas, consejos de salud y bienestar, y detalles sobre iniciativas de responsabilidad social corporativa. También se facilita el acceso al área privada para socios-clientes, donde pueden gestionar sus ventajas y promociones.',
      'projects.items.daimiel.title': 'Ayuntamiento de Daimiel',
      'projects.items.daimiel.description': 'El portal oficial del Ayuntamiento de Daimiel ofrece información actualizada sobre servicios municipales, noticias locales y eventos culturales. Incluye acceso a trámites en línea, la Sede Electrónica y el Portal de Transparencia, además de destacar el turismo en la región, como el Parque Nacional de Las Tablas de Daimiel.',
      'projects.items.edificaciones.title': 'Edificaciones Caballero',
      'projects.items.edificaciones.description': '​El sitio web de Edificaciones Caballero, presenta a esta empresa dedicada a la construcción y promoción inmobiliaria en Ciudad Real. Ofrece información sobre promociones de viviendas, servicios al cliente como financiación y servicio postventa, y destaca su compromiso con la calidad, el diseño y la accesibilidad en la creación de hogares confortables.',
      'projects.items.frozen.title': 'Juego 3D en Unity',
      'projects.items.frozen.description': 'Juego de plataformas 3D desarrollado con Unity',
      'projects.items.frozen.detailedDescription': 'Sumérgete en un mundo inspirado en la magia y la estética de Frozen, explorando escenarios helados llenos de desafíos, plataformas y aventuras únicas.',
      'projects.items.garciaBaquero.title': 'García Baquero',
      'projects.items.garciaBaquero.description': '​El sitio web oficial de García Baquero, presenta a esta reconocida empresa española dedicada a la producción de quesos desde 1962. Ofrece información sobre su historia, compromiso con la calidad y bienestar animal, y una amplia gama de productos, incluyendo quesos tradicionales, especialidades y opciones de oveja y cabra. Además, proporciona recetas, noticias y acceso a su tienda en línea para adquirir sus productos directamente',
      'projects.items.gicoop.title': 'GICOOP',
      'projects.items.gicoop.description': 'Gicoop es una aplicación de escritorio diseñada para la gestión integral de cooperativas agroalimentarias. Facilita el control de procesos administrativos, productivos y comerciales, optimizando la operativa diaria de las cooperativas. Su enfoque está en ofrecer una herramienta práctica y eficiente para gestionar datos, reportes y la trazabilidad de los productos',
      'projects.items.hm.title': 'Fundación HM',
      'projects.items.hm.description': 'El sitio web de la Fundación de Investigación HM Hospitales ofrece información sobre sus programas de investigación en áreas como oncología, cardiología y neurociencias, así como detalles sobre ensayos clínicos y colaboraciones institucionales. Además, proporciona acceso a recursos como memorias anuales y datos de contacto para investigadores y colaboradores.',
      'projects.items.mejorAppT.title': 'MejorAppT',
      'projects.items.mejorAppT.description': 'Aplicación Android desarrollada con .NET MAUI en colaboración con la Facultad de Psicología de la Universidad de Valencia. La aplicación está diseñada para realizar tests de conducta alimentaria y, en función de los resultados, la edad y otros factores, genera recomendaciones personalizadas adaptadas a cada usuario.',
      'projects.items.mejorAppT.detailedDescription': 'Mi aporte consistió en implementar el almacenamiento de datos, asegurando que la información se guardara tanto en la memoria local del dispositivo como en la nube en Firebase. Diseñé un sistema que sincroniza automáticamente los datos locales con la nube en cuanto el dispositivo detecta conexión a internet, garantizando la integridad y disponibilidad de la información.',
      'projects.items.portfolio.title': 'Portfolio Personal',
      'projects.items.portfolio.description': 'Sitio web personal para mostrar mi experiencia y proyectos.',
      'projects.items.portfolio.detailedDescription': 'Desarrollo de mi portfolio personal utilizando React y las últimas tecnologías frontend. Incluye animaciones fluidas, modo oscuro/claro, internacionalización y diseño adaptable a todos los dispositivos.',
      'projects.items.proyectoMia.title': 'Proyecto Mia',
      'projects.items.proyectoMia.description': 'Chat con IA que te explica sobre el módulo de DAM.',
      'projects.items.proyectoMia.detailedDescription': 'Desarrollo de una aplicación de escritorio utilizando WPF, con un patrón MVVM, diseño moderno, animaciones suaves y una arquitectura limpia y mantenible. Además de añadir Llama3.2 (modelo de IA), Vosk API (reconocimiento de voz) para que el avatar pueda hablar, y System.Speech (síntesis de voz) para que el avatar pueda hablar.',
      'projects.common.featured': 'Destacado',
      'projects.common.loadMore': 'Ver más',
      'projects.common.viewWebsite': 'Ver sitio web',
      'projects.common.viewGithub': 'Ver en GitHub',
      
      // Contacto
      'contact.title': 'Contacto',
      'contact.description': '¿Interesado en trabajar juntos? Envíame un mensaje y me pondré en contacto contigo lo antes posible.',
      'contact.name': 'Nombre',
      'contact.email': 'Email',
      'contact.subject': 'Asunto',
      'contact.message': 'Mensaje',
      'contact.send': 'Enviar Mensaje',
      'contact.success': '¡Mensaje enviado con éxito!',
      'contact.errorName': 'El nombre es obligatorio',
      'contact.errorEmail': 'Introduce un email válido',
      'contact.errorMessage': 'El mensaje es obligatorio',
      
      // Footer
      'footer.rights': 'Todos los derechos reservados.',
      'footer.navigation': 'Navegación',
      'footer.contacto': 'Contacto',
      'footer.derechos': 'Todos los derechos reservados.',
      'footer.hecho': 'Hecho con',
      'footer.tagline': 'Creando experiencias digitales únicas',
      'footer.description': 'Desarrollador web especializado en crear soluciones innovadoras y funcionales'
    }
  },
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Me',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      
      // Hero
      'hero.greeting': 'Hello! I\'m',
      'hero.title': 'Diego Moreno',
      'hero.subtitle': 'Web Developer',
      'hero.description': 'Creating elegant and functional digital experiences',
      'hero.cta': 'View Projects',
      
      // About
      'about.title': 'About Me',
      'about.description': 'Learn more about me, my experience, and my passion for web development.',
      'about.parrafo1': 'I\'m a web developer with a special focus on Drupal, Symfony, and C#. Since 2019, I\'ve been dedicated to creating efficient, scalable applications that truly bring value to businesses.',
      'about.parrafo2': 'I\'m passionate about solving problems, optimizing processes, and transforming ideas into functional and innovative digital solutions. I love staying in constant learning mode, always looking for new tools and better ways to get things done.',
      'about.parrafo3': 'I\'ve worked on projects ranging from advanced web platforms for supermarkets to critical tools for public administrations and hospitals. My goal is always to ensure performance, accessibility, and security.', 
      'about.parrafo4': 'If you\'re looking for someone proactive, eager to take on new challenges, and capable of taking your ideas to the next level, I\'m here to talk!',
      'about.experience': 'Years of Experience',
      'about.projects': 'Completed Projects',
      'about.clients': 'Satisfied Clients',
      'about.cumpleanos': 'Birthday',
      'about.direccion': 'Address',
      'about.cargo': 'Position',
      'about.descargarCV': 'Download CV',
      'about.datosPersonales': 'Personal Information',
      'about.fechaCumpleanos': 'July 15th, 1999',
      'about.email': 'dmr13250@gmail.com',
      'about.ubicacion': 'Daimiel (Ciudad Real), Spain',
      'about.puesto': 'Full-Stack Web Developer',
      
      // Skills
      'skills.title': 'My Skills',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Tools',
      
      // Projects
      'projects.title': 'Projects',
      'projects.description': 'A selection of my most outstanding works',
      'projects.filters.all': 'All',
      'projects.filters.drupal': 'Drupal',
      'projects.filters.wordpress': 'WordPress',
      'projects.filters.angular': 'Angular',
      'projects.filters.react': 'React',
      'projects.filters.csharp': 'C#',
      'projects.filters.unity': 'Unity',
      'projects.filters.wpf': 'WPF',
      'projects.filters.maui': 'MAUI',
      'projects.items.abacid.title': 'Abacid',
      'projects.items.abacid.description': 'The ABACID website provides information about laboratory tests focused on nutrition, health and wellness, genetic studies, and specialized consultations. Users can purchase tests such as molecular allergy diagnosis, food intolerance analysis, and non-invasive prenatal screening, with the option to perform them at home or in partner centers. Additionally, the portal provides details about each test, instructions for their performance, and online access to results. It also includes informative resources and contact information to resolve doubts or request advice.',
      'projects.items.apocalipsisMoscas.title': 'VR Game in Unity',
      'projects.items.apocalipsisMoscas.description': 'Face the fly invasion and test your reflexes while using different weapons to eliminate them. But be careful, you must not hit the wasps! Survive the challenge and prove your skills in this fun and frantic game.',
      'projects.items.benidorm.title': 'Benidorm City Council',
      'projects.items.benidorm.description': 'Multisite platform with news, political information, municipal areas, and featured events.',
      'projects.items.consum.title': 'Consum',
      'projects.items.consum.description': 'Development of a new website providing information about products, stores, coupon queries, and online shopping.',
      'projects.items.consum.detailedDescription': 'I participated in the development of Consum\'s new website, implementing key functionalities such as store finder, coupon management, and product catalog. I mainly worked on the frontend and internal API integration.',
      'projects.items.daimiel.title': 'Daimiel City Council',
      'projects.items.daimiel.description': 'The official portal of Daimiel City Council provides updated information about municipal services, local news, and cultural events. It includes access to online procedures, the Electronic Headquarters, and the Transparency Portal, as well as highlighting tourism in the region, such as Las Tablas de Daimiel National Park.',
      'projects.items.edificaciones.title': 'Edificaciones Caballero',
      'projects.items.edificaciones.description': 'Real estate website for buying, selling, and renting properties, with dynamic content and image galleries.',
      'projects.items.edificaciones.detailedDescription': 'I developed a custom website for a real estate company, including a property filtering system, advanced contact forms, and an admin panel to easily manage properties.',
      'projects.items.frozen.title': '3D Game in Unity',
      'projects.items.frozen.description': '3D platform game developed with Unity',
      'projects.items.frozen.detailedDescription': 'Immerse yourself in a world inspired by the magic and aesthetics of Frozen, exploring icy scenarios full of challenges, platforms, and unique adventures.',
      'projects.items.garciaBaquero.title': 'García Baquero',
      'projects.items.garciaBaquero.description': 'The official website of García Baquero presents this renowned Spanish company dedicated to cheese production since 1962. It offers information about its history, commitment to quality and animal welfare, and a wide range of products, including traditional cheeses, specialties, and sheep and goat options. Additionally, it provides recipes, news, and access to their online store to purchase their products directly.',
      'projects.items.gicoop.title': 'GICOOP',
      'projects.items.gicoop.description': 'Desktop application for cooperative management',
      'projects.items.gicoop.detailedDescription': 'Development of a desktop application for comprehensive cooperative management, including member management, accounting, and report generation with Crystal Reports.',
      'projects.items.hm.title': 'HM Hospitals',
      'projects.items.hm.description': 'Website with health news, coronavirus updates, research, awards, etc.',
      'projects.items.hm.detailedDescription': 'I worked on implementing the content management system for HM Hospitals, with customized sections for medical news, research, and awards. Includes an advanced search system and doctor profiles.',
      'projects.items.mejorAppT.title': 'MejorAppT',
      'projects.items.mejorAppT.description': 'Android application developed with .NET MAUI in collaboration with the Faculty of Psychology at the University of Valencia. The application is designed to conduct eating behavior tests and, based on the results, age, and other factors, generates personalized recommendations adapted to each user.',
      'projects.items.mejorAppT.detailedDescription': 'My contribution consisted of implementing data storage, ensuring that information was saved both in the device\'s local memory and in the cloud on Firebase. I designed a system that automatically synchronizes local data with the cloud as soon as the device detects an internet connection, guaranteeing data integrity and availability.',
      'projects.items.portfolio.title': 'Personal Portfolio',
      'projects.items.portfolio.description': 'Personal website to showcase my experience and projects.',
      'projects.items.portfolio.detailedDescription': 'Development of my personal portfolio using React and the latest frontend technologies. Includes fluid animations, dark/light mode, internationalization, and responsive design for all devices.',
      'projects.items.proyectoMia.title': 'Proyecto Mia',
      'projects.items.proyectoMia.description': 'Chat with IA that explains the DAM module.',
      'projects.items.proyectoMia.detailedDescription': 'Development of a desktop application using WPF, with a MVVM pattern, modern design, smooth animations, and a clean, maintainable architecture. Also adding Llama3.2 (IA model), Vosk API (voice recognition) for the avatar to speak, and System.Speech (voice synthesis) for the avatar to speak.',
      'projects.common.featured': 'Featured',
      'projects.common.loadMore': 'Load more',
      'projects.common.viewWebsite': 'View website',
      'projects.common.viewGithub': 'View on GitHub',
      
      // Contact
      'contact.title': 'Contact',
      'contact.description': 'Interested in working together? Send me a message and I\'ll get back to you as soon as possible.',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.success': 'Message sent successfully!',
      'contact.errorName': 'Name is required',
      'contact.errorEmail': 'Enter a valid email',
      'contact.errorMessage': 'Message is required',
      
      // Footer
      'footer.rights': 'All rights reserved.',
      'footer.navigation': 'Navigation',
      'footer.contacto': 'Contact',
      'footer.derechos': 'All rights reserved.',
      'footer.hecho': 'Made with',
      'footer.tagline': 'Creating unique digital experiences',
      'footer.description': 'Web developer specialized in creating innovative and functional solutions'
    }
  }
};

// Configuración de i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('preferredLanguage') || 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 