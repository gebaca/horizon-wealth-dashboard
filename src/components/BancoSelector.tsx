import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BANCOS_LIST } from '../config/Bancos';
import { useBanco } from '../context/Usebanco';

// ─── Logo del banco ───────────────────────────────────────────────────────────
// Muestra el logo (svg/webp) si existe, o las iniciales como fallback.

function BancoLogo({
  id,
  nombre,
  logoText,
}: {
  id: string;
  nombre: string;
  logoText: string;
}) {
  const [error, setError] = useState(false);
  const src = `/logos/${'santander'}.svg`; // intenta /logos/santander.svg, /logos/ing.svg, etc.

  if (error || id === 'default') {
    return (
      <span className='w-7 h-7 rounded-md bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent shrink-0'>
        {logoText}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={nombre}
      width={28}
      height={28}
      className='w-7 h-7 object-contain rounded-md shrink-0'
      onError={() => setError(true)}
    />
  );
}

// ─── Selector de banco ────────────────────────────────────────────────────────

interface BancoSelectorProps {
  onCambio: (id: string) => void;
}

export default function BancoSelector({ onCambio }: BancoSelectorProps) {
  const { banco } = useBanco();
  const [abierto, setAbierto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* // Animación del dropdown
  useEffect(() => {
    const el = dropdownRef.current?.querySelector('.dropdown-menu');
    if (!el) return;
    if (abierto) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -8, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [abierto]);*/

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        onClick={() => setAbierto((v) => !v)}
        className='flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-base bg-bg-subtle hover:bg-bg-card transition-colors'
      >
        <BancoLogo
          id={banco.id}
          nombre={banco.nombre}
          logoText={banco.logoText}
        />
        <span className='text-sm font-medium text-text-primary'>
          {banco.nombre}
        </span>
        <ChevronDown
          className='w-3.5 h-3.5 text-text-secondary transition-transform duration-200'
          style={{ transform: abierto ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {abierto && (
        <div className='dropdown-menu absolute top-full right-0 mt-2 w-52 bg-bg-card border border-border-base rounded-xl overflow-hidden z-50 shadow-lg'>
          {/* Opción default */}
          <button
            onClick={() => {
              onCambio('default');
              setAbierto(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-bg-subtle ${
              banco.id === 'default' ? 'text-accent' : 'text-text-secondary'
            }`}
          >
            <BancoLogo id='default' nombre='WealthView' logoText='WV' />
            <span>WealthView</span>
          </button>

          <div className='h-px bg-border-base mx-3' />

          {BANCOS_LIST.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                onCambio(b.id);
                setAbierto(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-bg-subtle ${
                banco.id === b.id
                  ? 'text-accent font-medium'
                  : 'text-text-secondary'
              }`}
            >
              <BancoLogo id={b.id} nombre={b.nombre} logoText={b.logoText} />
              <span>{b.nombre}</span>
              {banco.id === b.id && (
                <span className='ml-auto w-1.5 h-1.5 rounded-full bg-accent' />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
