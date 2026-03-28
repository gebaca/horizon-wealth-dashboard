import { Bell, DollarSign, Euro, MoreHorizontal } from 'lucide-react';
import type { Moneda } from '../typesUtils/types';

interface HeaderProps {
  clientName: string;
  currency: Moneda;
  onCurrencyChange: (c: Moneda) => void;
}

export default function Header({
  clientName,
  currency,
  onCurrencyChange,
}: HeaderProps) {
  return (
    <header className='h-16 bg-bg-primary border-b border-border-light flex items-center justify-between px-6'>
      {/* Título */}
      <div>
        <h1 className='text-lg font-semibold'>{clientName}</h1>
        <p className='text-text-muted text-sm'>Portfolio Overview</p>
      </div>

      <div className='flex items-center gap-4'>
        {/* Toggle de divisa */}
        <div className='flex items-center bg-bg-subtle rounded-lg p-1'>
          {(['EUR', 'USD'] as Moneda[]).map((c) => (
            <button
              key={c}
              onClick={() => onCurrencyChange(c)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currency === c
                  ? 'bg-accent text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {c === 'EUR' ? (
                <Euro className='w-4 h-4' />
              ) : (
                <DollarSign className='w-4 h-4' />
              )}
              {c}
            </button>
          ))}
        </div>

        {/* Notificaciones */}
        <button className='relative p-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'>
          <Bell className='w-5 h-5' />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full' />
        </button>

        {/* Más opciones */}
        <button className='p-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'>
          <MoreHorizontal className='w-5 h-5' />
        </button>

        {/* Avatar del gestor */}
        <div className='w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-medium'>
          RM
        </div>
      </div>
    </header>
  );
}
