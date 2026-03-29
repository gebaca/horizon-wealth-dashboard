import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { ClienteContext } from './ClienteContext';
import type {
  ClienteBancaPrivada,
  NuevoClienteForm,
} from '../typesUtils/types';
import { leerClientes, guardarClientes } from './clienteStorage';

const LS_ACTIVO = 'wv_cliente_activo';

export function ClienteProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<ClienteBancaPrivada[]>(leerClientes);

  const [clienteActivoId, setClienteActivoId] = useState<string>(() => {
    const saved = localStorage.getItem(LS_ACTIVO);
    if (saved) return saved;

    const iniciales = leerClientes();
    return iniciales[0]?.id ?? '';
  });

  useEffect(() => {
    guardarClientes(clientes);
  }, [clientes]);

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

// 👇 puedes dejar esto aquí porque NO se exporta
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
