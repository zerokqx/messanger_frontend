import { useEffect, useRef, useState } from 'react';

interface UseTailsProps {
  interval: number;
  trigger: unknown;
}
export function useTails({ interval, trigger }: UseTailsProps) {
  const ref = useRef<number | undefined>(undefined);
  const [tail, setTail] = useState(false);

  useEffect(() => {
    clearTimeout(ref.current);
    setTail(true);
    ref.current = setTimeout(() => {
      setTail(false);
    }, interval);
    return () => {
      clearTimeout(ref.current);
      ref.current = undefined;
    };
  }, [interval, trigger]);

  return tail;
}
