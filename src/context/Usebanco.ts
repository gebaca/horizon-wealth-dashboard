import { useContext } from 'react';
import { BancoContext } from './BancoContextValue';

export function useBanco() {
  const ctx = useContext(BancoContext);
  if (!ctx) throw new Error('useBanco debe usarse dentro de <BancoProvider>');
  return ctx;
}
