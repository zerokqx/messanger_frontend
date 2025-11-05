import { createContext } from 'react';
import type { ContextSuspenseLoader } from '../type/context.type';

export const SuspenseContext = createContext<ContextSuspenseLoader>({
  fallback: true,
});
