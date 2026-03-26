import type { Moneda } from './types';

/** Formatea un número como moneda completa: €1,250,000 */
export const formatCurrency = (value: number, currency: Moneda): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

/** Formatea números grandes en millones: €4.9M */
export const formatMillions = (value: number, currency: Moneda): string => {
  const symbol = currency === 'EUR' ? '€' : '$';
  if (value >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(1)}M`;
  }
  return formatCurrency(value, currency);
};

/** Aplica el tipo de cambio EUR → USD (hardcoded hasta integrar una API real) */
export const convertCurrency = (value: number, currency: Moneda): number =>
  currency === 'USD' ? value * 1.08 : value;
