import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Holding, Moneda } from '../typesUtils/types.ts';
import { formatCurrency, convertCurrency } from '../typesUtils/formatters.ts';

interface HoldingsTableProps {
  holdings: Holding[];
  currency: Moneda;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const RISK_CLASSES: Record<string, string> = {
  Low: 'bg-success/10 text-success border-success/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  High: 'bg-danger/10 text-danger border-danger/20',
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
      {/* Cabecera */}
      <div className='p-5 border-b border-border-base'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-text-primary font-semibold'>Posiciones</h3>
            <p className='text-text-secondary text-sm'>
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
              className='bg-bg-primary border border-border-base rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-64'
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
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-5 py-12 text-center text-text-muted text-sm'
                >
                  No se encontraron posiciones para "{searchQuery}"
                </td>
              </tr>
            ) : (
              filtered.map((holding, i) => (
                <tr
                  key={`${searchQuery}-${holding.ticker}`}
                  className={`border-b border-border-base/50 hover:bg-bg-subtle transition-colors ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                  style={{
                    animation: `fadeSlideIn 0.3s ease both`,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {/* Activo */}
                  <td className='px-5 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-9 h-9 bg-bg-subtle rounded-lg flex items-center justify-center text-xs font-semibold text-accent'>
                        {holding.ticker.slice(0, 2)}
                      </div>
                      <div>
                        <p className='text-text-primary font-medium text-sm'>
                          {holding.ticker}
                        </p>
                        <p className='text-text-secondary text-xs'>
                          {holding.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Peso */}
                  <td className='px-5 py-4 text-right'>
                    <div className='flex items-center justify-end gap-3'>
                      <div className='w-16 h-1.5 bg-bg-subtle rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-accent rounded-full'
                          style={{
                            width: `${(holding.allocation / 30) * 100}%`,
                          }}
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

                  {/* Rentabilidad — tinte semántico en valores extremos */}
                  <td className='px-5 py-4 text-right'>
                    <div
                      className={`inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded ${
                        holding.change >= 0 ? 'text-success' : 'text-danger'
                      } ${
                        holding.change > 15
                          ? 'bg-success/10'
                          : holding.change < -5
                            ? 'bg-danger/10'
                            : ''
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Keyframe definido inline para no depender de Tailwind */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
