// ─── Contexto ─────────────────────────────────────────────────────────────────

import { createContext } from 'react';
import type { Banco } from '../config/Bancos';

interface BancoContextValue {
  banco: Banco;
  setBanco: (id: string) => void;
}

export const BancoContext = createContext<BancoContextValue | null>(null);
