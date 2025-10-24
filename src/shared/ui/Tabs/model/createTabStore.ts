import { createSelectors } from '@/shared/lib/zustand/selectors';
import { create } from 'zustand';
import type { CreateTabStore } from '../types/createTabStore.type';

export const createTabStore = <T extends Lowercase<string>>(initial: T) => {
  const useTabStoreBase = create<CreateTabStore<T | 'main'>>()(
    (set, get, store) => ({
      currentTab: initial,
      prevTab: null,
      setCurrentTab: (tab) => {
        if (tab === get().currentTab) return;
        set((state) => ({
          prevTab: state.currentTab,
          currentTab: tab,
        }));
      },
      reset: () => {
        set(store.getInitialState());
      },
    })
  );
  return createSelectors(useTabStoreBase);
};
