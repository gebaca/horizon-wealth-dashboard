import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  Settings,
  Wallet,
  ShieldAlert,
  Droplets,
} from 'lucide-react';

// ─── hooks ───────────────────────────────────────────────────────────────────
import { useCurrencyTheme } from './hook/Usecurrencytheme';

// ─── Datos ───────────────────────────────────────────────────────────────────

import {
  cliente,
  portfolioChartData,
  assetAllocationData,
  holdingsData,
} from './mock/Clienteprivado';

// ─── Tipos ───────────────────────────────────────────────────────────────────
import type { Moneda, NavItem } from './typesUtils/types';

// ─── Utilidades ──────────────────────────────────────────────────────────────
import { formatMillions, convertCurrency } from './typesUtils/formatters';

// ─── Componentes ─────────────────────────────────────────────────────────────
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPICard from './components/KPICard';
import PortfolioChart from './components/PortfolioChart';
import AssetAllocation from './components/AssetAllocation';
import HoldingsTable from './components/HoldingsTable';

// ─── Configuración de navegación ─────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Clients', active: false },
  { icon: TrendingUp, label: 'Market Analysis', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currency, setCurrency] = useState<Moneda>('EUR');
  const [searchQuery, setSearchQuery] = useState('');

  useCurrencyTheme(currency);
  const aum = convertCurrency(cliente.saldoTotal, currency);

  return (
    <div className='flex h-screen bg-bg-primary text-text-primary'>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        navItems={NAV_ITEMS}
      />

      <main className='flex-1 flex flex-col overflow-hidden'>
        <Header
          clientName={cliente.nombre}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        <div className='flex-1 overflow-auto p-6 space-y-6'>
          {/* KPIs */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <KPICard
              title='AUM Total'
              value={formatMillions(aum, currency)}
              subtitle={`${cliente.inversiones.length} posiciones`}
              icon={Wallet}
              trend='up'
              trendValue='+12.4%'
            />
            <KPICard
              title='Rentabilidad YTD'
              value='+15.3%'
              subtitle='vs. +11.4% benchmark'
              icon={TrendingUp}
              trend='up'
              trendValue='+3.9%'
            />
            <KPICard
              title='Puntuación de Riesgo'
              value='6 / 10'
              subtitle='Moderado-Alto'
              icon={ShieldAlert}
            />
            <KPICard
              title='Ratio de Liquidez'
              value='18.2%'
              subtitle={`${formatMillions(convertCurrency(4_513_600, currency), currency)} disponible`}
              icon={Droplets}
            />
          </div>

          {/* Gráficos */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <PortfolioChart data={portfolioChartData} currency={currency} />
            <AssetAllocation data={assetAllocationData} />
          </div>

          {/* Tabla de posiciones */}
          <HoldingsTable
            holdings={holdingsData}
            currency={currency}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </main>
    </div>
  );
}
