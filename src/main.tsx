import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ClienteProvider } from './context/ClienteProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClienteProvider>
      <App />
    </ClienteProvider>
  </React.StrictMode>
);
