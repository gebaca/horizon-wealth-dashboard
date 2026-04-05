'use client';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { gsap } from 'gsap';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Plus,
  Settings,
  Trash2,
} from 'lucide-react';
import { useClientes } from '../hook/useClientes';
import { useBanco } from '../context/Usebanco';
import { BancoLogoSm, BancoLogoLg } from './BancoSelector';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNuevoCliente: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
  onNuevoCliente,
}: SidebarProps) {
  const { clientes, clienteActivo, seleccionarCliente, eliminarCliente } =
    useClientes();
  const [clientesAbierto, setClientesAbierto] = useState(true);
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null);
  const listaRef = useRef<HTMLUListElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  const { banco } = useBanco();

  // ── Acordeón GSAP ────────────────────────────────────────────────────────
  useEffect(() => {
    const lista = listaRef.current;
    const arrow = arrowRef.current;
    if (!lista || !arrow) return;
    if (clientesAbierto) {
      gsap.to(lista, {
        height: 'auto',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(arrow, { rotation: 0, duration: 0.25, ease: 'power2.out' });
    } else {
      gsap.to(lista, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(arrow, { rotation: -90, duration: 0.25, ease: 'power2.in' });
    }
  }, [clientesAbierto]);

  useEffect(() => {
    if (collapsed) setClientesAbierto(false);
  }, [collapsed]);
  // ── Eliminar con animación GSAP en el elemento de la lista ───────────────
  const handleEliminar = (id: string, liEl: HTMLLIElement) => {
    gsap.to(liEl, {
      opacity: 0,
      x: -16,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        eliminarCliente(id);
        setConfirmandoId(null);
      },
    });
  };

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-bg-sidebar border-r border-border-base flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className='h-16 flex items-center px-4 border-b border-border-base pl-6'>
        {collapsed ? (
          <div className='mx-auto'>
            <BancoLogoSm banco={banco} size={banco.size} />
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <BancoLogoLg banco={banco} size={banco.size} />
            {/* Solo WealthView muestra el nombre de la app */}
            {banco.id === 'default' && (
              <span className='font-semibold text-lg text-text-primary'>
                WealthView
              </span>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className='flex-1 p-3 overflow-hidden'>
        <div className='mb-1'>
          <button
            onClick={() => !collapsed && setClientesAbierto((v) => !v)}
            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-bg-subtle hover:text-text-primary transition-colors'
          >
            <Users className='w-5 h-5 shrink-0' />
            {!collapsed && (
              <>
                <span className='text-sm font-medium flex-1 text-left'>
                  Clientes
                </span>
                <ChevronDown ref={arrowRef} className='w-4 h-4 shrink-0' />
              </>
            )}
          </button>

          {!collapsed && (
            <ul
              ref={listaRef}
              className='overflow-hidden pl-3'
              style={{ height: 'auto', opacity: 1 }}
            >
              {clientes.map((c) => (
                <li key={c.id} className='group'>
                  {confirmandoId === c.id ? (
                    /* ── Estado de confirmación ── */
                    <div className='flex items-center gap-1 px-3 py-2 rounded-lg bg-danger/10 border border-danger/20'>
                      <span className='text-xs text-danger flex-1'>
                        ¿Eliminar?
                      </span>
                      <button
                        onClick={(e) =>
                          handleEliminar(
                            c.id,
                            e.currentTarget.closest('li') as HTMLLIElement
                          )
                        }
                        className='text-xs text-danger font-medium hover:brightness-125 transition-all'
                      >
                        Sí
                      </button>
                      <span className='text-danger/40 text-xs'>·</span>
                      <button
                        onClick={() => setConfirmandoId(null)}
                        className='text-xs text-text-secondary hover:text-text-primary transition-colors'
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    /* ── Estado normal ── */
                    <div className='flex items-center gap-1'>
                      <button
                        onClick={() => {
                          seleccionarCliente(c.id);
                          navigate({ to: '/dashboard' });
                        }}
                        className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          clienteActivo.id === c.id
                            ? 'bg-accent/15 text-accent font-medium'
                            : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
                        }`}
                      >
                        <span className='w-6 h-6 rounded-full bg-bg-subtle border border-border-base flex items-center justify-center text-xs font-semibold shrink-0'>
                          {c.nombre.charAt(0)}
                        </span>
                        <span className='truncate'>
                          {c.nombre.split(' ')[0]}
                        </span>
                      </button>

                      {/* Botón eliminar — solo visible en hover */}
                      <button
                        onClick={() => setConfirmandoId(c.id)}
                        className='opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-all duration-150 shrink-0'
                        title='Eliminar cliente'
                      >
                        <Trash2 className='w-3.5 h-3.5' />
                      </button>
                    </div>
                  )}
                </li>
              ))}

              <li>
                <button
                  onClick={onNuevoCliente}
                  className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-accent hover:bg-accent/10 transition-colors'
                >
                  <Plus className='w-4 h-4 shrink-0' />
                  <span>Nuevo cliente</span>
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Opciones */}
        <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-bg-subtle hover:text-text-primary transition-colors mt-1'>
          <Settings className='w-5 h-5 shrink-0' />
          {!collapsed && <span className='text-sm font-medium'>Opciones</span>}
        </button>
      </nav>

      {/* Colapsar */}
      <div className='p-3 border-t border-border-base'>
        <button
          onClick={onToggle}
          className='w-full flex items-center justify-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'
        >
          {collapsed ? (
            <ChevronRight className='w-5 h-5' />
          ) : (
            <>
              <ChevronLeft className='w-5 h-5' />
              <span className='text-sm'>Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
