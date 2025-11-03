import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UseLoaderStore } from '../types/useLoaderStore.type';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';

const useLoaderStoreBase = create<UseLoaderStore>()(
  immer((set) => ({
    isLoading: false,
    removeLoading() {
      set((s) => {
        s.isLoading = false;
      });
    },
    setLoading() {
      set((s) => {
        s.isLoading = true;
      });
    },
  }))
);
export const useLoaderStore = createSelectorHooks(useLoaderStoreBase);
