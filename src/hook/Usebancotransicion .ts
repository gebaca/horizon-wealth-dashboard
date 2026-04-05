import { useCallback } from 'react';
import { gsap } from 'gsap';
import { useBanco } from '../context/Usebanco';

/**
 * Devuelve una función que:
 * 1. Hace fade out de todos los elementos con clase `.banco-card`
 * 2. Aplica el nuevo tema del banco
 * 3. Hace fade in escalonado de los elementos
 *
 * Uso: añade className="banco-card" a cada tarjeta / sección del dashboard.
 */
export function useBancoTransicion() {
  const { setBanco } = useBanco();

  const cambiarBanco = useCallback(
    (id: string) => {
      const cards = gsap.utils.toArray<HTMLElement>('.banco-card');

      const tl = gsap.timeline();

      // 1. Fade out de todas las cards
      tl.to(cards, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: 'power2.in',
        stagger: 0.04,
      });

      // 2. Aplicar el nuevo banco (cambia variables CSS) + pequeña pausa
      tl.call(() => setBanco(id));
      tl.to({}, { duration: 0.1 }); // pausa para que el browser repinte los colores

      // 3. Fade in con los nuevos colores
      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.06,
      });
    },
    [setBanco]
  );

  return cambiarBanco;
}
