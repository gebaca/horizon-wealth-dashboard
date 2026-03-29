import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type {
  ClienteBancaPrivada,
  NuevoClienteForm,
} from '../typesUtils/types';
import { clienteInicial } from '../mock/Clienteprivado';

// ─── Helpers de localStorage ─────────────────────────────────────────────────

const LS_CLIENTES = 'wv_clientes';
const LS_ACTIVO = 'wv_cliente_activo';

function leerClientes(): ClienteBancaPrivada[] {
  try {
    const raw = localStorage.getItem(LS_CLIENTES);
    return raw ? (JSON.parse(raw) as ClienteBancaPrivada[]) : [clienteInicial];
  } catch {
    return [clienteInicial];
  }
}

function guardarClientes(clientes: ClienteBancaPrivada[]) {
  localStorage.setItem(LS_CLIENTES, JSON.stringify(clientes));
}

// ─── Tipos del contexto ───────────────────────────────────────────────────────

interface ClienteContextValue {
  clientes: ClienteBancaPrivada[];
  clienteActivo: ClienteBancaPrivada;
  seleccionarCliente: (id: string) => void;
  agregarCliente: (datos: NuevoClienteForm) => ClienteBancaPrivada;
  eliminarCliente: (id: string) => void;
}

// ─── Contexto ────────────────────────────────────────────────────────────────

const ClienteContext = createContext<ClienteContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function ClienteProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<ClienteBancaPrivada[]>(leerClientes);

  const [clienteActivoId, setClienteActivoId] = useState<string>(() => {
    return localStorage.getItem(LS_ACTIVO) ?? clientes[0]?.id ?? '';
  });

  // Persistir cada vez que cambia la lista
  useEffect(() => {
    guardarClientes(clientes);
  }, [clientes]);

  // Persistir el cliente activo
  useEffect(() => {
    localStorage.setItem(LS_ACTIVO, clienteActivoId);
  }, [clienteActivoId]);

  const clienteActivo =
    clientes.find((c) => c.id === clienteActivoId) ?? clientes[0];

  const seleccionarCliente = useCallback((id: string) => {
    setClienteActivoId(id);
  }, []);

  const agregarCliente = useCallback(
    (datos: NuevoClienteForm): ClienteBancaPrivada => {
      const nuevo: ClienteBancaPrivada = {
        id: crypto.randomUUID(),
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        perfilRiesgo: datos.perfilRiesgo,
        saldoTotal: datos.saldoTotal,
        creadoEn: new Date().toISOString(),
        // Generamos rendimiento mensual sintético desde el saldo
        rendimientoMensual: generarRendimiento(datos.saldoTotal),
        inversiones: datos.inversiones.map((inv, i) => ({
          ...inv,
          ganancia: [14.3, 6.8, 21.0, 18.5, -3.1][i % 5],
        })),
      };
      setClientes((prev) => [...prev, nuevo]);
      setClienteActivoId(nuevo.id);
      return nuevo;
    },
    []
  );

  const eliminarCliente = useCallback(
    (id: string) => {
      setClientes((prev) => {
        const siguientes = prev.filter((c) => c.id !== id);
        if (clienteActivoId === id && siguientes.length > 0) {
          setClienteActivoId(siguientes[0].id);
        }
        return siguientes;
      });
    },
    [clienteActivoId]
  );

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        clienteActivo,
        seleccionarCliente,
        agregarCliente,
        eliminarCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}

// ─── Hook de consumo ─────────────────────────────────────────────────────────

export function useClientes() {
  const ctx = useContext(ClienteContext);
  if (!ctx)
    throw new Error('useClientes debe usarse dentro de <ClienteProvider>');
  return ctx;
}

// ─── Utilidad interna ─────────────────────────────────────────────────────────

function generarRendimiento(saldoBase: number) {
  const meses = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  let valor = saldoBase * 0.86;
  return meses.map((mes) => {
    valor = valor * (1 + (Math.random() * 0.04 - 0.01));
    return { mes, valor: Math.round(valor) };
  });
}
