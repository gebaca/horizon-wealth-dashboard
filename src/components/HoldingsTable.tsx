import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Moneda, Holding } from '../typesUtils/types';
import { formatCurrency, convertCurrency } from '../typesUtils/formatters';

interface HoldingsTableProps {
  holdings: Holding[];
  currency: Moneda;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

// Clases de color según nivel de riesgo
const RISK_CLASSES: Record<string, string> = {
  Low: 'bg-emerald-500/10 text-success border-emerald-500/20',
  Medium: 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  High: 'bg-red-500/10    text-danger    border-red-500/20',
};

export default function HoldingsTable({
  holdings,
  currency,
  searchQuery,
  onSearchChange,
}: HoldingsTableProps) {
  const filtered = holdings.filter(
    (h) =>
      h.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-bg-card border border-border-base rounded-lg'>
      {/* Cabecera con buscador */}
      <div className='p-5 border-b border-border-base'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-text-primary font-semibold'>Posiciones</h3>
            <p className='text-text-muted text-sm'>
              Top holdings por peso en cartera
            </p>
          </div>
          <div className='relative'>
            <Search className='w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2' />
            <input
              type='text'
              placeholder='Buscar posición...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className='bg-bg-primary border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64'
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-border-base'>
              {['Activo', 'Peso', 'Valor', 'Rentabilidad', 'Riesgo'].map(
                (col) => (
                  <th
                    key={col}
                    className={`text-text-muted text-xs font-medium uppercase tracking-wider px-5 py-3 ${
                      col === 'Activo'
                        ? 'text-left'
                        : 'text-right last:text-center'
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((holding, i) => (
              <tr
                key={holding.ticker}
                className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${
                  i === filtered.length - 1 ? 'border-b-0' : ''
                }`}
              >
                {/* Activo */}
                <td className='px-5 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center text-xs font-semibold text-indigo-400'>
                      {holding.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <p className='text-text-primary font-medium text-sm'>
                        {holding.ticker}
                      </p>
                      <p className='text-text-muted text-xs'>{holding.name}</p>
                    </div>
                  </div>
                </td>

                {/* Peso con barra */}
                <td className='px-5 py-4 text-right'>
                  <div className='flex items-center justify-end gap-3'>
                    <div className='w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-indigo-500 rounded-full'
                        style={{ width: `${(holding.allocation / 30) * 100}%` }}
                      />
                    </div>
                    <span className='text-text-primary text-sm w-12 text-right'>
                      {holding.allocation}%
                    </span>
                  </div>
                </td>

                {/* Valor */}
                <td className='px-5 py-4 text-right text-text-primary text-sm'>
                  {formatCurrency(
                    convertCurrency(holding.value, currency),
                    currency
                  )}
                </td>

                {/* Rentabilidad */}
                <td className='px-5 py-4 text-right'>
                  <div
                    className={`inline-flex items-center gap-1 text-sm ${
                      holding.change >= 0 ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {holding.change >= 0 ? (
                      <ArrowUpRight className='w-4 h-4' />
                    ) : (
                      <ArrowDownRight className='w-4 h-4' />
                    )}
                    {Math.abs(holding.change).toFixed(2)}%
                  </div>
                </td>

                {/* Riesgo */}
                <td className='px-5 py-4 text-center'>
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                      RISK_CLASSES[holding.risk] ?? RISK_CLASSES.Low
                    }`}
                  >
                    {holding.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
