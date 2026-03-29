// ─── Tipos del cliente ──────────────────────────────────────────────────────

export interface Inversion {
  nombre: string;
  valor: number;
  ganancia: number;
}

export interface DatoRendimiento {
  mes: string;
  valor: number;
}

export type PerfilRiesgo = 'conservador' | 'moderado' | 'agresivo';

export interface ClienteBancaPrivada {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  perfilRiesgo: PerfilRiesgo;
  saldoTotal: number;
  inversiones: Inversion[];
  rendimientoMensual: DatoRendimiento[];
  creadoEn: string; // ISO date string
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

// ─── Tipos del formulario de nuevo cliente ───────────────────────────────────

export interface NuevoClienteForm {
  // Paso 1 — datos personales
  nombre: string;
  email: string;
  telefono: string;
  // Paso 2 — perfil de riesgo
  perfilRiesgo: PerfilRiesgo;
  // Paso 3 — saldo y activos
  saldoTotal: number;
  inversiones: Omit<Inversion, 'ganancia'>[];
}
