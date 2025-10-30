import { use } from 'react';
import type { Inject } from '../../types';
import { InjectContext } from '../ui/InjectContext';

export const useInject = <T extends object>(): Inject<T> => {
  const context = use(InjectContext);
  if (!context) throw new Error('Not iternal context');

  return context as Inject<T>;
};
