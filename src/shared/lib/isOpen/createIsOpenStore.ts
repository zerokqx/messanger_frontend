import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { FabricStores, UseModalStore } from './types';

export const createIsOpenStore:FabricStores = () => {
  const store = create<UseModalStore>()(
    devtools((set, get) => ({
      isOpen: false,
      close() {
        set({ isOpen: false });
      },
      open() {
        set({ isOpen: true });
      },
      toggle() {
        set({
          isOpen: !get().isOpen,
        });
      },
    }))
  );
  return store
};

