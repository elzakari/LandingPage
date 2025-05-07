import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Remove the import that's causing the error
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Comment out the reportWebVitals call since we removed the import
// reportWebVitals();