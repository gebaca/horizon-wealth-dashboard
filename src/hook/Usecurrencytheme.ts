import { useEffect } from 'react';
import type { Moneda } from '../typesUtils/types';

/**
 * Aplica o elimina la clase `mode-usd` en <html> cada vez que cambia la divisa.
 * Las variables CSS de :root.mode-usd se activan automáticamente,
 * y la transición definida en :root hace el cambio gradual en toda la página.
 */
export function useCurrencyTheme(currency: Moneda) {
  useEffect(() => {
    document.documentElement.classList.toggle('mode-usd', currency === 'USD');
  }, [currency]);
}
