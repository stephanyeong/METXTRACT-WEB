import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const rootStyles = document.documentElement.style;
rootStyles.setProperty('--foreground', '#010101');
rootStyles.setProperty('--gbackground', '#f5f6fa');
rootStyles.setProperty('--dgbackground', '#d6d6d6');
rootStyles.setProperty('--wbackground', '#ffffff');
rootStyles.setProperty('--primary', '#048CB4');
rootStyles.setProperty('--secondary', '#7746db');
rootStyles.setProperty('--lbgbackground', '#59a7bd');
rootStyles.setProperty('--ftrbackground', '#77A8B6');



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
