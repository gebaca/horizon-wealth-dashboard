import { useAnimatedNumber } from '../hook/Useanimatednumber.ts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  trendValue?: string;
  rawValue?: number;
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  rawValue,
}: KPICardProps) {
  const animated = useAnimatedNumber(rawValue ?? 0);

  return (
    <div className='bg-bg-card border border-border-base rounded-lg p-5'>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-text-secondary text-sm font-medium'>{title}</span>
        <div className='p-2 bg-bg-subtle rounded-lg'>
          <Icon className='w-4 h-4 text-accent' />
        </div>
      </div>

      <div className='flex items-end justify-between'>
        <div>
          {/* key={value} fuerza re-mount del <p> al cambiar value,
              disparando kpiPulse sin necesidad de estado */}
          <p
            key={value}
            className='text-2xl font-semibold text-text-primary'
            style={{ animation: 'kpiPulse 0.4s ease' }}
          >
            {rawValue !== undefined
              ? value.replace(/[\d.,]+/, animated.toLocaleString('es-ES'))
              : value}
          </p>
          {subtitle && (
            <p className='text-text-muted text-xs mt-1'>{subtitle}</p>
          )}
        </div>

        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-success' : 'text-danger'}`}
          >
            {trend === 'up' ? (
              <ArrowUpRight className='w-4 h-4' />
            ) : (
              <ArrowDownRight className='w-4 h-4' />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes kpiPulse {
          0%   { opacity: 0.5; transform: scale(0.97); }
          60%  { opacity: 1;   transform: scale(1.02); }
          100% { opacity: 1;   transform: scale(1);    }
        }
      `}</style>
    </div>
  );
}
