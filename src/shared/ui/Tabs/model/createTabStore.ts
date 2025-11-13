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

  const useTabStoreBase = create<CreateTabStore<T>>()((set, get) => ({
    currentTab: initial,
    history: [initial],
    setCurrentTab: (tab) => {
      const { currentTab, history } = get();
      if (tab === currentTab) return;

      const previousTab = history[history.length - 2];

      if (tab === previousTab) {
        set((state) => ({
          currentTab: tab,
          history: state.history.slice(0, -1),
        }));
      } else {
        set((state) => ({
          currentTab: tab,
          history: [...state.history, tab],
        }));
      }
    },
    goBack: () => {
      const { history } = get();
      if (history.length < 2) return;
      const prev = history[history.length - 2];
      set((state) => ({
        currentTab: prev,
        history: state.history.slice(0, -1),
      }));
    },
    reset: () => {
      set({ currentTab: initial, history: [initial] });
    },
  }));

  return createSelectorHooks(useTabStoreBase);
};
