/**
 * index.js - Punto de entrada de la aplicación
 * 
 * Este archivo es el punto de entrada principal de la aplicación React.
 * Configura el renderizado de la aplicación, incluyendo:
 * - React.StrictMode para desarrollo
 * - Configuración de i18n para internacionalización
 * - Renderizado del componente App
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
