/**
 * Skeleton loader — muestra barras pulsantes mientras carga el contenido.
 * Usar dentro de cualquier contenedor con altura fija.
 */
export default function SkeletonLoader({ rows = 4 }: { rows?: number }) {
  return (
    <div className='w-full h-full flex flex-col justify-end gap-2 p-2 animate-pulse'>
      {/* Simula barras de un gráfico de área con alturas variables */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className='w-full bg-bg-subtle rounded'
          style={{ height: `${20 + ((i * 37) % 55)}%` }}
        />
      ))}
    </div>
  );
}
