import { createStore } from '@colorfy-software/zfy';
import type { LayoutStoreType } from './store.type';
import { createStoreAction } from '../../zustand/create-store-action/create-store-action';

export const useLayoutStore = createStore<LayoutStoreType>(
  'layout',
  {
    asside: false,
    disable: false,
    footer: false,
    header: false,
  },
  { log: true }
);
export const layoutAction = createStoreAction(
  [
    (value: boolean) => {
      useLayoutStore.setState((s) => {
        return {
          data: {
            ...s.data,
            asside: value,
          },
        };
      });
    },
  ],
  ['setAside']
);
