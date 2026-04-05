import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';
import App from './App.tsx';
import { ClienteProvider } from './context/ClienteProvider.tsx';
import { BancoProvider } from './context/BancoContext.tsx';
import './index.css';

// ─── Configuración mínima de Router para que no dé error ─────────────────
const rootRoute = createRootRoute({
  component: App, // Tu componente App será la raíz
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => null, // El contenido ya está en App
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });

// ─── Renderizado ──────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BancoProvider>
      <ClienteProvider>
        {/* El RouterProvider debe envolver a App para que useNavigate funcione */}
        <RouterProvider router={router} />
      </ClienteProvider>
    </BancoProvider>
  </React.StrictMode>
);
