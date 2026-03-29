import { useEffect, useRef, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { gsap } from 'gsap';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useClientes } from '../hook/useClientes.ts';
import type {
  InversionForm,
  NuevoClienteForm,
  PerfilRiesgo,
} from '../typesUtils/types.ts';

interface NuevoClientePanelProps {
  abierto: boolean;
  onCerrar: () => void;
}

const PASOS = ['Datos personales', 'Perfil de riesgo', 'Saldo y activos'];

const PERFILES: { valor: PerfilRiesgo; label: string; descripcion: string }[] =
  [
    {
      valor: 'conservador',
      label: 'Conservador',
      descripcion: 'Prioriza la seguridad sobre la rentabilidad',
    },
    {
      valor: 'moderado',
      label: 'Moderado',
      descripcion: 'Equilibrio entre riesgo y rentabilidad',
    },
    {
      valor: 'agresivo',
      label: 'Agresivo',
      descripcion: 'Maximiza la rentabilidad asumiendo más riesgo',
    },
  ];

export default function NuevoClientePanel({
  abierto,
  onCerrar,
}: NuevoClientePanelProps) {
  const { agregarCliente } = useClientes();
  const [paso, setPaso] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // ── Animación de entrada/salida con GSAP ─────────────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (abierto) {
      gsap.set(panel, { x: '100%' });
      gsap.set(backdrop, { opacity: 0, pointerEvents: 'auto' });
      gsap.to(panel, { x: '0%', duration: 0.45, ease: 'power3.out' });
      gsap.to(backdrop, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(panel, { x: '100%', duration: 0.35, ease: 'power3.in' });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        pointerEvents: 'none',
        onComplete: () => setPaso(0),
      });
    }
  }, [abierto]);

  // ── Animación de transición entre pasos ──────────────────────────────────
  const contenidoRef = useRef<HTMLDivElement>(null);

  const animarPaso = (siguiente: number) => {
    const el = contenidoRef.current;
    if (!el) {
      setPaso(siguiente);
      return;
    }
    const dir = siguiente > paso ? 1 : -1;
    gsap.fromTo(
      el,
      { opacity: 0, x: 24 * dir },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => setPaso(siguiente),
      }
    );
  };

  // ── TanStack Form ─────────────────────────────────────────────────────────
  const form = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      perfilRiesgo: 'moderado' as PerfilRiesgo,
      saldoTotal: 0,
      inversiones: [{ nombre: '', valor: 0, tipo: '' }] as InversionForm[],
    } satisfies NuevoClienteForm,
    onSubmit: ({ value }) => {
      agregarCliente(value);
      onCerrar();
    },
  });

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onCerrar}
        className='fixed inset-0 bg-black/50 z-40'
        style={{ opacity: 0, pointerEvents: 'none' }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className='fixed top-0 right-0 h-full w-120 bg-bg-card border-l border-border-base z-50 flex flex-col'
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Cabecera */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-border-base'>
          <div>
            <h2 className='text-text-primary font-semibold text-lg'>
              Nuevo cliente
            </h2>
            <p className='text-text-secondary text-sm mt-0.5'>
              Paso {paso + 1} de {PASOS.length} — {PASOS[paso]}
            </p>
          </div>
          <button
            onClick={onCerrar}
            className='p-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Indicador de pasos */}
        <div className='flex gap-1.5 px-6 py-4'>
          {PASOS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= paso ? 'bg-accent' : 'bg-border-base'
              }`}
            />
          ))}
        </div>

        {/* Contenido del paso */}
        <div ref={contenidoRef} className='flex-1 overflow-y-auto px-6 py-2'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* ── Paso 0: Datos personales ── */}
            {paso === 0 && (
              <div className='space-y-5'>
                <form.Field
                  name='nombre'
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'El nombre es obligatorio' : undefined,
                  }}
                >
                  {(field) => (
                    <Campo
                      label='Nombre completo'
                      error={field.state.meta.errors[0]}
                    >
                      <input
                        className={inputClass}
                        placeholder='Ej: María García López'
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Campo>
                  )}
                </form.Field>

                <form.Field
                  name='email'
                  validators={{
                    onChange: ({ value }) =>
                      !value.includes('@') ? 'Email no válido' : undefined,
                  }}
                >
                  {(field) => (
                    <Campo label='Email' error={field.state.meta.errors[0]}>
                      <input
                        className={inputClass}
                        type='email'
                        placeholder='cliente@ejemplo.com'
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Campo>
                  )}
                </form.Field>

                <form.Field name='telefono'>
                  {(field) => (
                    <Campo label='Teléfono'>
                      <input
                        className={inputClass}
                        placeholder='+34 600 000 000'
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Campo>
                  )}
                </form.Field>
              </div>
            )}

            {/* ── Paso 1: Perfil de riesgo ── */}
            {paso === 1 && (
              <form.Field name='perfilRiesgo'>
                {(field) => (
                  <div className='space-y-3'>
                    {PERFILES.map((p) => (
                      <button
                        key={p.valor}
                        type='button'
                        onClick={() => field.handleChange(p.valor)}
                        className={`w-full text-left px-4 py-4 rounded-lg border transition-all duration-200 ${
                          field.state.value === p.valor
                            ? 'border-accent bg-accent/10 text-text-primary'
                            : 'border-border-base bg-bg-subtle text-text-secondary hover:border-accent/50'
                        }`}
                      >
                        <div className='flex items-center justify-between'>
                          <span className='font-medium text-sm'>{p.label}</span>
                          {field.state.value === p.valor && (
                            <Check className='w-4 h-4 text-accent' />
                          )}
                        </div>
                        <p className='text-xs mt-1 text-text-muted'>
                          {p.descripcion}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </form.Field>
            )}

            {/* ── Paso 2: Saldo y activos ── */}
            {paso === 2 && (
              <div className='space-y-5'>
                <form.Field
                  name='saldoTotal'
                  validators={{
                    onChange: ({ value }) =>
                      value <= 0 ? 'El saldo debe ser mayor a 0' : undefined,
                  }}
                >
                  {(field) => (
                    <Campo
                      label='Saldo total (€)'
                      error={field.state.meta.errors[0]}
                    >
                      <input
                        className={inputClass}
                        type='number'
                        placeholder='1000000'
                        value={field.state.value || ''}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </Campo>
                  )}
                </form.Field>

                <form.Field name='inversiones'>
                  {(field) => (
                    <div className='space-y-3'>
                      <label className='text-text-secondary text-sm font-medium block'>
                        Distribución de activos
                      </label>
                      {field.state.value.map((inv, i) => (
                        <div key={i} className='space-y-2'>
                          <div className='flex gap-2'>
                            <input
                              className={`${inputClass} flex-1`}
                              placeholder='Nombre del activo'
                              value={inv.nombre}
                              onChange={(e) => {
                                const next = [...field.state.value];
                                next[i] = {
                                  ...next[i],
                                  nombre: e.target.value,
                                };
                                field.handleChange(next);
                              }}
                            />
                            <input
                              className={`${inputClass} w-28`}
                              type='number'
                              placeholder='€'
                              value={inv.valor || ''}
                              onChange={(e) => {
                                const next = [...field.state.value];
                                next[i] = {
                                  ...next[i],
                                  valor: Number(e.target.value),
                                };
                                field.handleChange(next);
                              }}
                            />
                          </div>
                          {/* Selector de tipo */}
                          <select
                            className={inputClass}
                            value={inv.tipo ?? ''}
                            onChange={(e) => {
                              const next = [...field.state.value];
                              next[i] = { ...next[i], tipo: e.target.value };
                              field.handleChange(next);
                            }}
                          >
                            <option value='' disabled>
                              Tipo de activo...
                            </option>
                            <option value='renta_variable'>
                              Renta variable
                            </option>
                            <option value='renta_fija'>
                              Renta fija / Bonos
                            </option>
                            <option value='capital_privado'>
                              Capital privado
                            </option>
                            <option value='etf'>ETF</option>
                            <option value='materias_primas'>
                              Materias primas
                            </option>
                            <option value='inmobiliario'>Inmobiliario</option>
                            <option value='liquidez'>
                              Liquidez / Efectivo
                            </option>
                          </select>
                        </div>
                      ))}
                      <button
                        type='button'
                        onClick={() =>
                          field.handleChange([
                            ...field.state.value,
                            { nombre: '', valor: 0, tipo: '' },
                          ])
                        }
                        className='text-accent text-sm hover:underline'
                      >
                        + Añadir activo
                      </button>
                    </div>
                  )}
                </form.Field>
              </div>
            )}
          </form>
        </div>

        {/* Footer con navegación */}
        <div className='px-6 py-5 border-t border-border-base flex justify-between'>
          <button
            onClick={() => (paso > 0 ? animarPaso(paso - 1) : onCerrar())}
            className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />
            {paso === 0 ? 'Cancelar' : 'Anterior'}
          </button>

          {paso < PASOS.length - 1 ? (
            <button
              onClick={() => animarPaso(paso + 1)}
              className='flex items-center gap-2 px-5 py-2 rounded-lg text-sm bg-accent text-white hover:brightness-110 transition-all'
            >
              Siguiente
              <ChevronRight className='w-4 h-4' />
            </button>
          ) : (
            <button
              onClick={() => form.handleSubmit()}
              className='flex items-center gap-2 px-5 py-2 rounded-lg text-sm bg-accent text-white hover:brightness-110 transition-all'
            >
              <Check className='w-4 h-4' />
              Guardar cliente
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ── Componentes auxiliares ───────────────────────────────────────────────────

const inputClass =
  'w-full bg-bg-subtle border border-border-base rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors';

function Campo({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-1.5'>
      <label className='text-text-secondary text-sm font-medium block'>
        {label}
      </label>
      {children}
      {error && <p className='text-danger text-xs'>{error}</p>}
    </div>
  );
}
