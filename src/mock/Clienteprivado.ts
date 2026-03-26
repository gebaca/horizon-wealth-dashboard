import type {
  ClienteBancaPrivada,
  Holding,
  AssetSlice,
  PortfolioPoint,
} from '../typesUtils/types';

// ─── Datos del cliente (fuente de verdad) ───────────────────────────────────

export const cliente: ClienteBancaPrivada = {
  nombre: 'Alejandro Montserrat Vidal',
  saldoTotal: 4_872_350,

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

// ─── Datos derivados para los gráficos ──────────────────────────────────────

/**
 * Convierte rendimientoMensual al formato que espera el AreaChart.
 * Genera un benchmark sintético al 85% del valor del portfolio.
 */
export const portfolioChartData: PortfolioPoint[] =
  cliente.rendimientoMensual.map(({ mes, valor }) => ({
    month: mes,
    portfolio: valor,
    benchmark: Math.round(valor * 0.85),
  }));

/**
 * Convierte las inversiones del cliente al formato del PieChart (donut).
 */
const PIE_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#64748b', '#e879f9'];

export const assetAllocationData: AssetSlice[] = cliente.inversiones.map(
  ({ nombre, valor }, i) => ({
    name: nombre,
    value: Math.round((valor / cliente.saldoTotal) * 100),
    color: PIE_COLORS[i],
  })
);

/**
 * Convierte las inversiones al formato de la tabla de Holdings.
 */
const RISK_MAP: Array<'Low' | 'Medium' | 'High'> = [
  'Medium',
  'Low',
  'High',
  'Medium',
  'Low',
];

export const holdingsData: Holding[] = cliente.inversiones.map(
  ({ nombre, valor, ganancia }, i) => ({
    ticker: nombre.slice(0, 4).toUpperCase(),
    name: nombre,
    allocation: Math.round((valor / cliente.saldoTotal) * 1000) / 10,
    value: valor,
    change: ganancia,
    risk: RISK_MAP[i],
  })
);
