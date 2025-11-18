import { createStore } from '@colorfy-software/zfy';
import type { LayoutStoreType } from './store.type';

export const useLayoutStore = createStore<LayoutStoreType>(
  'layout',
  {
    asside: true,
    disable: false,
    footer: false,
    header: false,
  },
  { log: true }
);
