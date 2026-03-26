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
    <header className='h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6'>
      {/* Título */}
      <div>
        <h1 className='text-lg font-semibold'>{clientName}</h1>
        <p className='text-slate-500 text-sm'>Portfolio Overview</p>
      </div>

      <div className='flex items-center gap-4'>
        {/* Toggle de divisa */}
        <div className='flex items-center bg-slate-800 rounded-lg p-1'>
          {(['EUR', 'USD'] as Moneda[]).map((c) => (
            <button
              key={c}
              onClick={() => onCurrencyChange(c)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currency === c
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
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
        <button className='relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors'>
          <Bell className='w-5 h-5' />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full' />
        </button>

        {/* Más opciones */}
        <button className='p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors'>
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
