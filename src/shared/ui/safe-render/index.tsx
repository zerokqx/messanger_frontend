import type { ReactNode } from 'react';

export const withSafeRender = (bool: boolean, component: ReactNode) => {
  return () => {
    return bool && component;
  };
};
