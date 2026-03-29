import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClienteProvider } from './context/ClienteContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClienteProvider>
      <App />
    </ClienteProvider>
  </React.StrictMode>
);
