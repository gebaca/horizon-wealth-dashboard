import { useContext } from 'react';
import { ClienteContext } from '../context/ClienteContext';

export function useClientes() {
  const ctx = useContext(ClienteContext);
  if (!ctx) {
    throw new Error('useClientes debe usarse dentro de <ClienteProvider>');
  }
  return ctx;
}
