import { useEffect, useState } from 'react';

export function useChartReady(dep: unknown, delay = 600): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      if (!cancelled) setReady(true);
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(t);
      setReady(false);
    };
  }, [dep, delay]);

  return ready;
}
