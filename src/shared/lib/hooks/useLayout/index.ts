import { createStore } from '@colorfy-software/zfy';
import type { AsideOptions, LayoutStoreType } from './store.type';
import { createStoreAction } from '../../zustand/createStoreAction/createStoreAction';

export const useLayoutStore = createStore<LayoutStoreType>(
  'layout',
  {
    asside: false,
    disable: false,
    footer: false,
    header: false,
    asideOptions: {
      render: null,
    },
  },
  { log: true }
);

export const layoutAction = createStoreAction(
  [
    (options: AsideOptions) => {
      console.log('🟢 Opening aside with:', options.render);

      useLayoutStore.setState((s) => ({
        data: {
          ...s.data,
          asside: true,
          asideOptions: options,
        },
      }));
    },

    (clear = false) => {
      useLayoutStore.setState((s) => ({
        data: {
          ...s.data,
          asside: false,
          ...(clear && { asideOptions: { render: null } }),
        },
      }));
    },
  ],
  ['openAside', 'closeAside']
);

export const useAsideRender = () => {
  return useLayoutStore((s) => s.data.asideOptions.render);
};
