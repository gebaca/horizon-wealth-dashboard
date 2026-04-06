// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface BancoTokens {
  bgPrimary: string;
  bgCard: string;
  bgHeader: string;
  bgSidebar: string;
  bgSubtle: string;
  borderBase: string;
  borderLight: string;
  accent: string;
  accentMuted: string;
  success: string;
  danger: string;
  textPrimary: string;
  textSidebar: string;
  textSecondary: string;
  textMuted: string;
}

export interface Banco {
  id: string;
  nombre: string;
  logoText: string;
  logoPath?: string; // ruta al logo svg/webp en /public/logos/
  logoPaths?: string;
  fontUrl?: string;
  fontFamily: string;
  tokens: BancoTokens;
  size?: number; // tamaño del logo en el sidebar
}

// ─── Paleta base (sin banco seleccionado) ────────────────────────────────────

export const BANCO_DEFAULT: Banco = {
  id: 'default',
  nombre: 'WealthView',
  logoText: 'WV',
  fontFamily: 'Inter, sans-serif',
  size: 20,
  tokens: {
    bgPrimary: '#0b0e14',
    bgCard: '#161b22',
    bgHeader: '#161b22',
    bgSidebar: '#161b22',
    bgSubtle: '#1c2333',
    borderBase: '#2a3142',
    borderLight: '#1e2636',
    accent: '#3b82f6',
    accentMuted: 'rgba(59,130,246,0.15)',
    success: '#10b981',
    danger: '#ef4444',
    textPrimary: '#f1f5f9',
    textSidebar: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#4b5563',
  },
};

// ─── Santander ───────────────────────────────────────────────────────────────

const SANTANDER: Banco = {
  id: 'santander',
  nombre: 'Santander',
  logoText: 'SAN',
  logoPath: '/logos/santander.svg',
  logoPaths: '/logos/santanders.svg',
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap',
  fontFamily: '"Open Sans", sans-serif',
  size: 110,
  tokens: {
    bgPrimary: '#F5F7F9', // Gris "Hielo" para el fondo general
    bgCard: '#FFFFFF', // Blanco puro para resaltar los datos
    bgHeader: '#FFFFFF',
    bgSidebar: '#1A1A1A', // Casi negro para un menú lateral premium
    bgSubtle: '#F0F2F5', // Para hovers o secciones secundarias
    borderBase: '#E2E8F0', // Gris claro para separar cards
    borderLight: '#EDF2F7',
    accent: '#EC0000', // Rojo Santander oficial
    accentMuted: 'rgba(236, 0, 0, 0.1)',
    success: '#16A34A',
    danger: '#DC2626',
    textPrimary: '#1A202C', // Casi negro
    textSidebar: '#FFFFFF', // Texto para el sidebar
    textSecondary: '#4A5568', // Gris oscuro para labels
    textMuted: '#A0AEC0', // Gris suave para ISINs o fechas
  },
};
// ─── ING ─────────────────────────────────────────────────────────────────────

const ING: Banco = {
  id: 'ing',
  nombre: 'ING',
  logoText: 'ING',
  logoPath: '/logos/ing.svg',
  logoPaths: '/logos/ings.svg',
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
  fontFamily: '"Montserrat", sans-serif',
  size: 110,
  tokens: {
    bgPrimary: '#FFFFFF', // Blanco total (típico de ING)
    bgCard: '#F7F9FC', // Cards con un ligerísimo tono azulado/gris
    bgHeader: '#FFFFFF',
    bgSidebar: '#001E61', // Azul marino profundo oficial de ING
    bgSubtle: '#EBF1FA',
    borderBase: '#CBD5E0',
    borderLight: '#E2E8F0',
    accent: '#FF6200', // Naranja oficial ING
    accentMuted: 'rgba(255, 98, 0, 0.1)',
    success: '#16A34A',
    danger: '#E53E3E',
    textPrimary: '#001E61', // Texto principal en azul marino para ING
    textSidebar: '#FFFFFF', // Texto para el sidebar
    textSecondary: '#4A5568',
    textMuted: '#718096',
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
