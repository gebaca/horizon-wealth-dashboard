// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface BancoTokens {
  bgPrimary: string;
  bgCard: string;
  bgSubtle: string;
  borderBase: string;
  borderLight: string;
  accent: string;
  accentMuted: string;
  success: string;
  danger: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface Banco {
  id: string;
  nombre: string;
  logoText: string; // texto del logo (hasta tener SVGs reales)
  fontUrl?: string; // URL de Google Fonts
  fontFamily: string; // font-family CSS
  tokens: BancoTokens;
}

// ─── Paleta base (sin banco seleccionado) ────────────────────────────────────

export const BANCO_DEFAULT: Banco = {
  id: 'default',
  nombre: 'WealthView',
  logoText: 'WV',
  fontFamily: 'Inter, sans-serif',
  tokens: {
    bgPrimary: '#0b0e14',
    bgCard: '#161b22',
    bgSubtle: '#1c2333',
    borderBase: '#2a3142',
    borderLight: '#1e2636',
    accent: '#3b82f6',
    accentMuted: 'rgba(59,130,246,0.15)',
    success: '#10b981',
    danger: '#ef4444',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#4b5563',
  },
};

// ─── Santander ───────────────────────────────────────────────────────────────

const SANTANDER: Banco = {
  id: 'santander',
  nombre: 'Santander',
  logoText: 'SAN',
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600&display=swap',
  fontFamily: '"Source Sans 3", sans-serif',
  tokens: {
    bgPrimary: '#0f0505',
    bgCard: '#1c0808',
    bgSubtle: '#2a0e0e',
    borderBase: '#3d1212',
    borderLight: '#2d0d0d',
    accent: '#ec0000',
    accentMuted: 'rgba(236,0,0,0.15)',
    success: '#16a34a',
    danger: '#f97316',
    textPrimary: '#fafafa',
    textSecondary: '#fca5a5',
    textMuted: '#7f1d1d',
  },
};

// ─── ING ─────────────────────────────────────────────────────────────────────

const ING: Banco = {
  id: 'ing',
  nombre: 'ING',
  logoText: 'ING',
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
  fontFamily: '"Inter", sans-serif',
  tokens: {
    bgPrimary: '#0a0d06',
    bgCard: '#131a0a',
    bgSubtle: '#1c2610',
    borderBase: '#2d3d18',
    borderLight: '#222e12',
    accent: '#ff6200',
    accentMuted: 'rgba(255,98,0,0.15)',
    success: '#16a34a',
    danger: '#ef4444',
    textPrimary: '#fafafa',
    textSecondary: '#fed7aa',
    textMuted: '#7c5a2a',
  },
};

// ─── Registro de bancos ───────────────────────────────────────────────────────

export const BANCOS: Record<string, Banco> = {
  default: BANCO_DEFAULT,
  santander: SANTANDER,
  ing: ING,
};

export const BANCOS_LIST = Object.values(BANCOS).filter(
  (b) => b.id !== 'default'
);
