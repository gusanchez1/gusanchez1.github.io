import { useEffect, useState } from 'react';

// Hora atual, atualizada na virada de cada minuto.
export function useCurrentTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval;
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return now;
}
