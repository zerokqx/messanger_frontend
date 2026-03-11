import {  useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';

export function useTails(interval: number, trigger: unknown) {
  const ref = useRef<number | undefined>(undefined);
  const [tail, setTail] = useState(false);

  useUpdateEffect(() => {
    if (!trigger) return;
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

type Position = 'inactive' | 'active' | 'cooldown';

export function useSuperTails(interval: number, trigger: unknown) {
  const activeRef = useRef<number | undefined>(undefined);
  const cooldownRef = useRef<number | undefined>(undefined);
  const [tail, setTail] = useState<Position>('inactive');

  useUpdateEffect(() => {
  console.log('trigger changed:', trigger);
    const clearTimers = () => {
      if (activeRef.current) clearTimeout(activeRef.current);
      if (cooldownRef.current) clearTimeout(cooldownRef.current);
      activeRef.current = undefined;
      cooldownRef.current = undefined;
    };

    clearTimers();
    setTail('active');
    activeRef.current = setTimeout(() => {
      setTail('cooldown');
      cooldownRef.current = setTimeout(() => {
        setTail('inactive');
      }, interval);
    }, interval);
    return clearTimers;
  }, [interval, trigger]);

  return tail;
}

export function ifSuperTails<I, A, C>(
  state: Position,
  inactive?: I,
  active?: A,
  cooldown?: C
) {
  switch (state) {
    case 'inactive':
      return inactive;
    case 'active':
      return active;
    case 'cooldown':
      return cooldown;
  }
}
