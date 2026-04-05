import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { TrendingUp } from 'lucide-react';
import { BANCOS_LIST, type Banco } from '../config/Bancos';
import { useBanco } from '../context/Usebanco';

// ─── Logo del banco ───────────────────────────────────────────────────────────

export function BancoLogoLg({
  banco,
  size = 28,
}: {
  banco: Banco;
  size?: number;
}) {
  const [error, setError] = useState(false);

  // WealthView — icono TrendingUp
  if (banco.id === 'default') {
    return (
      <div
        className='rounded-lg bg-accent flex items-center justify-center shrink-0'
        style={{ width: size, height: size }}
      >
        <TrendingUp
          style={{ width: size * 0.6, height: size * 0.6 }}
          className='text-white'
        />
      </div>
    );
  }

  // Banco con logo — img con fallback a iniciales
  if (banco.logoPath && !error) {
    return (
      <img
        src={banco.logoPath}
        alt={banco.nombre}
        width={size}
        height={size}
        className='object-contain rounded-md shrink-0'
        style={{ width: size, height: size }}
        onError={() => setError(true)}
      />
    );
  }

  // Fallback iniciales
  return (
    <span
      className='rounded-md bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent shrink-0'
      style={{ width: size, height: size }}
    >
      {banco.logoText}
    </span>
  );
}
export function BancoLogoSm({
  banco,
  size = 28,
}: {
  banco: Banco;
  size?: number;
}) {
  const [error, setError] = useState(false);

  // WealthView — icono TrendingUp
  if (banco.id === 'default') {
    return (
      <div
        className='rounded-lg bg-accent flex items-center justify-center shrink-0'
        style={{ width: size, height: size }}
      >
        <TrendingUp
          style={{ width: size * 0.6, height: size * 0.6 }}
          className='text-white'
        />
      </div>
    );
  }

  // Banco con logo — img con fallback a iniciales
  if (banco.logoPath && !error) {
    return (
      <img
        src={banco.logoPaths}
        alt={banco.nombre}
        width={size}
        height={size}
        className='object-contain rounded-md shrink-0'
        style={{ width: size, height: size }}
        onError={() => setError(true)}
      />
    );
  }

  // Fallback iniciales
  return (
    <span
      className='rounded-md bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent shrink-0'
      style={{ width: size, height: size }}
    >
      {banco.logoText}
    </span>
  );
}

// ─── Selector ─────────────────────────────────────────────────────────────────

interface BancoSelectorProps {
  onCambio: (id: string) => void;
}

export default function BancoSelector({ onCambio }: BancoSelectorProps) {
  const { banco } = useBanco();
  const [abierto, setAbierto] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const abrir = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect)
      setPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    setAbierto(true);
  };

  useEffect(() => {
    if (!abierto) return;
    const handler = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      )
        setAbierto(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [abierto]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el || !abierto) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: -6, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
    );
  }, [abierto]);

  const allBancos = [
    {
      id: 'default',
      nombre: 'WealthView',
      logoText: 'WV',
      logoPath: undefined,
      fontFamily: '',
      tokens: banco.id === 'default' ? banco.tokens : ({} as unknown),
    },
    ...BANCOS_LIST,
  ];

  const dropdown = abierto
    ? createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: pos.top,
            right: pos.right,
            zIndex: 9999,
          }}
          className='w-48 bg-bg-card border border-border-base rounded-xl overflow-hidden shadow-xl'
        >
          {allBancos.map((b, i) => (
            <div key={b.id}>
              {i === 1 && <div className='h-px bg-border-base mx-3' />}
              <button
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
                <BancoLogoSm banco={b as Banco} size={24} />
                <span>{b.nombre}</span>
                {banco.id === b.id && (
                  <span className='ml-auto w-1.5 h-1.5 rounded-full bg-accent' />
                )}
              </button>
            </div>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* Botón — solo el logo */}
      <button
        ref={buttonRef}
        onClick={abierto ? () => setAbierto(false) : abrir}
        className='p-1.5 rounded-lg border border-border-base bg-bg-subtle hover:bg-bg-card transition-colors'
        title={banco.nombre}
      >
        <BancoLogoSm banco={banco} size={28} />
      </button>
      {dropdown}
    </>
  );
}
