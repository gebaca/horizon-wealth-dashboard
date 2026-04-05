import { useCallback, useState, type ReactNode } from 'react';
import { BANCO_DEFAULT, BANCOS, type Banco } from '../config/Bancos.ts';
import { BancoContext } from './BancoContextValue.ts';

// ─── Aplicar tokens al <html> ─────────────────────────────────────────────────
// Usamos style inline en lugar de clases para tener máxima prioridad CSS
// (html[style] > :root.mode-usd > :root)

function aplicarTokens(banco: Banco) {
  const r = document.documentElement;
  const t = banco.tokens;

  r.style.setProperty('--color-bg-primary', t.bgPrimary);
  r.style.setProperty('--color-bg-card', t.bgCard);
  r.style.setProperty('--color-bg-subtle', t.bgSubtle);
  r.style.setProperty('--color-border-base', t.borderBase);
  r.style.setProperty('--color-border-light', t.borderLight);
  r.style.setProperty('--color-accent', t.accent);
  r.style.setProperty('--color-accent-muted', t.accentMuted);
  r.style.setProperty('--color-success', t.success);
  r.style.setProperty('--color-danger', t.danger);
  r.style.setProperty('--color-text-primary', t.textPrimary);
  r.style.setProperty('--color-text-secondary', t.textSecondary);
  r.style.setProperty('--color-text-muted', t.textMuted);
  r.style.setProperty('font-family', banco.fontFamily);
}

function cargarFuente(url?: string) {
  if (!url) return;
  const id = `font-${url.slice(-20).replace(/\W/g, '')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function BancoProvider({ children }: { children: ReactNode }) {
  const [banco, setBancoState] = useState<Banco>(BANCO_DEFAULT);

  const setBanco = useCallback((id: string) => {
    const siguiente = BANCOS[id] ?? BANCO_DEFAULT;
    cargarFuente(siguiente.fontUrl);
    aplicarTokens(siguiente);
    setBancoState(siguiente);
  }, []);

  return (
    <BancoContext.Provider value={{ banco, setBanco }}>
      {children}
    </BancoContext.Provider>
  );
}
