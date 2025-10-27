import {
  createSelectorHooks,
  type ZustandHookSelectors,
} from 'auto-zustand-selectors-hook';
import { create, type StoreApi, type UseBoundStore } from 'zustand';
import type { CreateTabStore } from '../types/createTabStore.type';

export type CreateTabStoreFunction<T extends Lowercase<string>> = (
  initial: T
) => UseBoundStore<StoreApi<CreateTabStore<T>>> &
  ZustandHookSelectors<CreateTabStore<T>>;

export const createTabStore = <T extends Lowercase<string>>(
  ...args: Parameters<CreateTabStoreFunction<T>>
): ReturnType<CreateTabStoreFunction<T>> => {
  const [initial] = args;
  const useTabStoreBase = create<CreateTabStore<T>>()((set, get, store) => ({
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
  }));
  return createSelectorHooks(useTabStoreBase);
};
