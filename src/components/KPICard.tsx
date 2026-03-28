import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: KPICardProps) {
  return (
    <div className='bg-bg-card border border-border-base rounded-lg p-5'>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-text-secondary text-sm font-medium'>{title}</span>
        <div className='p-2 bg-slate-700/50 rounded-lg'>
          <Icon className='w-4 h-4 text-indigo-400' />
        </div>
      </div>

      <div className='flex items-end justify-between'>
        <div>
          <p className='text-2xl font-semibold text-text-primary'>{value}</p>
          {subtitle && (
            <p className='text-text-muted text-xs mt-1'>{subtitle}</p>
          )}
        </div>

        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-success' : 'text-danger'
            }`}
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
    </div>
  );
}
