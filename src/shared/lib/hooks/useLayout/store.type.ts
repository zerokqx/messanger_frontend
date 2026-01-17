import type { ReactNode } from 'react';

export interface AsideOptions {
  render: ReactNode | null;
}

export interface LayoutStoreType {
  asside: boolean;
  header: boolean;
  disable: boolean;
  footer: boolean;
  asideOptions: AsideOptions;
}
