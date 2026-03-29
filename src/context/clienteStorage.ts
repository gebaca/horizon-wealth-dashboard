import type { ClienteBancaPrivada } from '../typesUtils/types';
import { clienteInicial } from '../mock/Clienteprivado';

const LS_CLIENTES = 'wv_clientes';

export function leerClientes(): ClienteBancaPrivada[] {
  try {
    const raw = localStorage.getItem(LS_CLIENTES);
    return raw ? JSON.parse(raw) : [clienteInicial];
  } catch {
    return [clienteInicial];
  }
}

export function guardarClientes(clientes: ClienteBancaPrivada[]) {
  localStorage.setItem(LS_CLIENTES, JSON.stringify(clientes));
}
