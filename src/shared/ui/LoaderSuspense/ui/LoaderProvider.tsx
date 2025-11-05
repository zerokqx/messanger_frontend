import { useMemo, type ReactNode } from 'react';
import { SuspenseContext } from '../model/context';
import type { ContextSuspenseLoader } from '../type/context.type';

export const LoaderProvider = ({
  children,
  fallback,
}: { children: ReactNode } & ContextSuspenseLoader) => {
  const value = useMemo(() => ({ fallback }), [fallback]);

  
  return <SuspenseContext value={value}>{children}</SuspenseContext>;
};
