import { createContext } from 'react';
import type {
  ClienteBancaPrivada,
  NuevoClienteForm,
} from '../typesUtils/types';

export interface ClienteContextValue {
  clientes: ClienteBancaPrivada[];
  clienteActivo: ClienteBancaPrivada;
  seleccionarCliente: (id: string) => void;
  agregarCliente: (datos: NuevoClienteForm) => ClienteBancaPrivada;
  eliminarCliente: (id: string) => void;
}

export const ClienteContext = createContext<ClienteContextValue | null>(null);
