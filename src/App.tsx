import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TrendingUp, Wallet, ShieldAlert, Droplets } from 'lucide-react';

import { useCurrencyTheme } from './hook/Usecurrencytheme.ts';
import { useClientes } from './hook/useClientes.ts';
import { formatMillions, convertCurrency } from './typesUtils/formatters.ts';
import {
  portfolioChartDataDesde,
  assetAllocationDataDesde,
  holdingsDataDesde,
} from './mock/Clienteprivado.ts';
import type { Moneda } from './typesUtils/types.ts';

import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import KPICard from './components/KPICard.tsx';
import PortfolioChart from './components/PortfolioChart.tsx';
import AssetAllocation from './components/AssetAllocation.tsx';
import HoldingsTable from './components/HoldingsTable.tsx';
import NuevoClientePanel from './components/Nuevoclientepanel.tsx';

export default function App() {
  const { clienteActivo } = useClientes();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currency, setCurrency] = useState<Moneda>('EUR');
  const [searchQuery, setSearchQuery] = useState('');
  const [panelAbierto, setPanelAbierto] = useState(false);

  useCurrencyTheme(currency);

  // ── Transición GSAP al cambiar de cliente ─────────────────────────────────
  const dashboardRef = useRef<HTMLDivElement>(null);
  const prevClienteId = useRef(clienteActivo.id);

  useEffect(() => {
    if (prevClienteId.current === clienteActivo.id) return;
    prevClienteId.current = clienteActivo.id;
    const el = dashboardRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [clienteActivo.id]);

  const aum = convertCurrency(clienteActivo.saldoTotal, currency);
  const portfolioData = portfolioChartDataDesde(clienteActivo);
  const allocationData = assetAllocationDataDesde(clienteActivo);
  const holdings = holdingsDataDesde(clienteActivo);

  return (
    <div className='flex h-screen bg-bg-primary text-text-primary'>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        onNuevoCliente={() => setPanelAbierto(true)}
      />

      <main className='flex-1 flex flex-col overflow-hidden'>
        <Header
          clientName={clienteActivo.nombre}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        <div ref={dashboardRef} className='flex-1 overflow-auto p-6 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <KPICard
              classNameBanco='banco-card'
              title='AUM Total'
              value={formatMillions(aum, currency)}
              rawValue={aum}
              subtitle={`${clienteActivo.inversiones.length} posiciones`}
              icon={Wallet}
              trend='up'
              trendValue='+12.4%'
            />
            <KPICard
              classNameBanco='banco-card'
              title='Rentabilidad YTD'
              value='+15.3%'
              subtitle='vs. +11.4% benchmark'
              icon={TrendingUp}
              trend='up'
              trendValue='+3.9%'
            />
            <KPICard
              classNameBanco='banco-card'
              title='Puntuación de Riesgo'
              value={perfilARiesgo(clienteActivo.perfilRiesgo)}
              subtitle={clienteActivo.perfilRiesgo}
              icon={ShieldAlert}
            />
            <KPICard
              classNameBanco='banco-card'
              title='Ratio de Liquidez'
              value='18.2%'
              subtitle={`${formatMillions(convertCurrency(clienteActivo.saldoTotal * 0.182, currency), currency)} disponible`}
              icon={Droplets}
            />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 banco-card'>
            <PortfolioChart data={portfolioData} currency={currency} />
            <AssetAllocation data={allocationData} />
          </div>

          <HoldingsTable
            classNameBanco='banco-card'
            holdings={holdings}
            currency={currency}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </main>

      <NuevoClientePanel
        abierto={panelAbierto}
        onCerrar={() => setPanelAbierto(false)}
      />
    </div>
  );
}

function perfilARiesgo(perfil: string): string {
  return (
    { conservador: '3 / 10', moderado: '6 / 10', agresivo: '9 / 10' }[perfil] ??
    '6 / 10'
  );
}
