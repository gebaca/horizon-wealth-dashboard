import type {
  ClienteBancaPrivada,
  Holding,
  AssetSlice,
  PortfolioPoint,
} from '../typesUtils/types';

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#64748b', '#e879f9'];
const RISK_MAP: Array<'Low' | 'Medium' | 'High'> = [
  'Medium',
  'Low',
  'High',
  'Medium',
  'Low',
];

// ─── Cliente inicial de ejemplo (seed) ──────────────────────────────────────

export const clienteInicial: ClienteBancaPrivada = {
  id: 'cliente-inicial',
  nombre: 'Alejandro Montserrat Vidal',
  email: 'alejandro.montserrat@example.com',
  telefono: '+34 600 123 456',
  perfilRiesgo: 'moderado',
  saldoTotal: 4_872_350,
  creadoEn: '2024-01-15T10:00:00.000Z',
  inversiones: [
    { nombre: 'Renta Variable Europa', valor: 1_250_000, ganancia: 14.32 },
    { nombre: 'Bonos Corporativos IG', valor: 980_500, ganancia: 6.78 },
    { nombre: 'Fondo de Capital Privado', valor: 1_100_000, ganancia: 21.05 },
    { nombre: 'ETF S&P 500', valor: 875_200, ganancia: 18.47 },
    { nombre: 'Materias Primas (Oro)', valor: 666_650, ganancia: -3.12 },
  ],
  rendimientoMensual: [
    { mes: 'Ene', valor: 4_210_000 },
    { mes: 'Feb', valor: 4_275_500 },
    { mes: 'Mar', valor: 4_198_300 },
    { mes: 'Abr', valor: 4_320_150 },
    { mes: 'May', valor: 4_415_000 },
    { mes: 'Jun', valor: 4_389_700 },
    { mes: 'Jul', valor: 4_502_800 },
    { mes: 'Ago', valor: 4_478_100 },
    { mes: 'Sep', valor: 4_610_450 },
    { mes: 'Oct', valor: 4_695_000 },
    { mes: 'Nov', valor: 4_780_200 },
    { mes: 'Dic', valor: 4_872_350 },
  ],
};

// ─── Funciones que derivan datos de CUALQUIER cliente ────────────────────────

export function portfolioChartDataDesde(
  c: ClienteBancaPrivada
): PortfolioPoint[] {
  return c.rendimientoMensual.map(({ mes, valor }) => ({
    month: mes,
    portfolio: valor,
    benchmark: Math.round(valor * 0.85),
  }));
}

export function assetAllocationDataDesde(c: ClienteBancaPrivada): AssetSlice[] {
  return c.inversiones.map(({ nombre, valor }, i) => ({
    name: nombre,
    value: Math.round((valor / c.saldoTotal) * 100),
    color: PIE_COLORS[i % PIE_COLORS.length],
  }));
}

export function holdingsDataDesde(c: ClienteBancaPrivada): Holding[] {
  return c.inversiones.map(({ nombre, valor, ganancia }, i) => ({
    ticker: nombre.slice(0, 4).toUpperCase(),
    name: nombre,
    allocation: Math.round((valor / c.saldoTotal) * 1000) / 10,
    value: valor,
    change: ganancia,
    risk: RISK_MAP[i % RISK_MAP.length],
  }));
}
