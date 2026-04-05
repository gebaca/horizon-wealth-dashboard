import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ClienteProvider } from './context/ClienteProvider.tsx';
import './index.css';
import { BancoProvider } from './context/BancoContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BancoProvider>
      <ClienteProvider>
        <App />
      </ClienteProvider>
    </BancoProvider>
  </React.StrictMode>
);
