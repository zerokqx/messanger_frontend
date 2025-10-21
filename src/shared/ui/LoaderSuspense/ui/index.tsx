import { Loader } from '@mantine/core';
import { lazy, Suspense, use } from 'react';
import { SuspenseContext } from '../model/context';

export const LoaderSuspense = ({
  lazyComponent: LazyComponent,
  condition = true,
}: {
  condition?: (() => boolean) | boolean;
  lazyComponent: ReturnType<typeof lazy>;
}) => {
  const { fallback } = use(SuspenseContext);
  return (typeof condition === 'function' ? condition() : condition) ? (
    <Suspense fallback={fallback ? <Loader /> : null}>
      <LazyComponent />
    </Suspense>
  ) : null;
};
