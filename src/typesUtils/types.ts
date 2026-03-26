// ─── Tipos del cliente (desde clientePrivado.ts) ───────────────────────────

export interface Inversion {
  nombre: string;
  valor: number;
  ganancia: number; // porcentaje
}

export interface DatoRendimiento {
  mes: string;
  valor: number;
}

export interface ClienteBancaPrivada {
  nombre: string;
  saldoTotal: number;
  inversiones: Inversion[];
  rendimientoMensual: DatoRendimiento[];
}

// ─── Tipos de la UI ─────────────────────────────────────────────────────────

export type Moneda = 'EUR' | 'USD';

export interface Holding {
  ticker: string;
  name: string;
  allocation: number;
  value: number;
  change: number;
  risk: 'Low' | 'Medium' | 'High';
}

export interface AssetSlice {
  name: string;
  value: number;
  color: string;
}

export interface PortfolioPoint {
  month: string;
  portfolio: number;
  benchmark: number;
}

export interface NavItem {
  label: string;
  icon: React.ElementType;
  active: boolean;
}
