import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PortfolioPoint, Moneda } from '../typesUtils/types';
import CustomTooltip from './CustomTooltip';

interface PortfolioChartProps {
  data: PortfolioPoint[];
  currency: Moneda;
}

export default function PortfolioChart({
  data,
  currency,
}: PortfolioChartProps) {
  return (
    <div className='lg:col-span-2 bg-bg-card border border-border-base rounded-lg p-5'>
      {/* Cabecera */}
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-text-primary font-semibold'>
            Evolución del Portfolio
          </h3>
          <p className='text-text-muted text-sm'>
            Rendimiento 12 meses vs. Benchmark
          </p>
        </div>
        <div className='flex items-center gap-4 text-sm'>
          <LegendDot color='bg-indigo-500' label='Portfolio' />
          <LegendDot color='bg-slate-500' label='Benchmark' />
        </div>
      </div>

      {/* Gráfico */}
      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id='portfolioGradient'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor='#6366f1' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#6366f1' stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id='benchmarkGradient'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor='#64748b' stopOpacity={0.2} />
                <stop offset='95%' stopColor='#64748b' stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#334155'
              vertical={false}
            />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  currency={currency}
                />
              )}
            />
            <Area
              type='monotone'
              dataKey='benchmark'
              stroke='#64748b'
              strokeWidth={2}
              fill='url(#benchmarkGradient)'
            />
            <Area
              type='monotone'
              dataKey='portfolio'
              stroke='#6366f1'
              strokeWidth={2}
              fill='url(#portfolioGradient)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Pequeño sub-componente local para la leyenda
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className='flex items-center gap-2'>
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className='text-text-secondary'>{label}</span>
    </div>
  );
}
