import { Bell, DollarSign, Euro, MoreHorizontal } from 'lucide-react';
import type { Moneda } from '../typesUtils/types';
import BancoSelector from './BancoSelector';
import { useBancoTransicion } from '../hook/Usebancotransicion ';

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
  const cambiarBanco = useBancoTransicion();

  return (
    <header className='h-16 bg-bg-header border-b border-border-base flex items-center justify-between px-6'>
      {/* Título */}
      <div>
        <h1 className='text-lg font-semibold text-text-primary'>
          {clientName}
        </h1>
        <p className='text-text-muted text-sm'>Portfolio Overview</p>
      </div>

      <div className='flex items-center gap-4'>
        {/* Selector de banco */}
        <BancoSelector onCambio={cambiarBanco} />

        {/* Toggle EUR / USD */}
        <div className='relative flex items-center w-41 h-9.5 bg-bg-subtle rounded-[10px] border border-border-base overflow-hidden'>
          <div
            className='absolute top-0 left-0 h-full w-1/2 bg-accent rounded-[9px] transition-transform duration-300 ease-in-out'
            style={{
              transform:
                currency === 'USD' ? 'translateX(100%)' : 'translateX(0)',
            }}
          />
          <button
            onClick={() => onCurrencyChange('EUR')}
            className={`relative z-10 flex items-center justify-center gap-1.5 w-1/2 h-full text-sm font-medium transition-colors duration-250 ${
              currency === 'EUR'
                ? 'text-white'
                : 'text-text-primary hover:text-text-muted'
            }`}
          >
            <Euro className='w-3.5 h-3.5' />
            EUR
          </button>
          <button
            onClick={() => onCurrencyChange('USD')}
            className={`relative z-10 flex items-center justify-center gap-1.5 w-1/2 h-full text-sm font-medium transition-colors duration-250 ${
              currency === 'USD'
                ? 'text-white'
                : 'text-text-primary hover:text-text-muted'
            }`}
          >
            <DollarSign className='w-3.5 h-3.5' />
            USD
          </button>
        </div>

        {/* Notificaciones */}
        <button className='relative p-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'>
          <Bell className='w-5 h-5 text-text-primary' />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full' />
        </button>

        {/* Más opciones */}
        <button className='p-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'>
          <MoreHorizontal className='w-5 h-5' />
        </button>

        {/* Avatar */}
        <div className='w-9 h-9 bg-accent rounded-full flex items-center justify-center text-sm font-medium text-white'>
          RM
        </div>
      </div>
    </header>
  );
}
