import type { Moneda } from '../typesUtils/types.ts';
import { formatMillions } from '../typesUtils/formatters.ts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{
    value?: number | string | readonly (string | number)[];
    dataKey?: number | string | ((obj: unknown) => unknown);
  }>;
  label?: number | string;
  currency: Moneda;
}

export default function CustomTooltip({
  active,
  payload,
  label,
  currency,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className='bg-bg-subtle border border-slate-700 rounded-lg p-3 shadow-xl'>
      <p className='text-text-secondary text-xs mb-2'>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className='text-sm'>
          <span className='text-text-secondary'>
            {String(entry.dataKey) === 'portfolio' ? 'Portfolio' : 'Benchmark'}
            :{' '}
          </span>
          <span className='text-text-primary font-medium'>
            {formatMillions(Number(entry.value ?? 0), currency)}
          </span>
        </p>
      ))}
    </div>
  );
}
