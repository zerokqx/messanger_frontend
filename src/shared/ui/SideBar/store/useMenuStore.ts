import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UseMenuStore } from '../types/useMenuStore.type';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useSideBarStoreBase = create<UseMenuStore>()(
  persist(
    (set, get) => ({
      isOpen: true,

      open() {
        set(() => ({ isOpen: true }));
      },

      close() {
        set(() => ({ isOpen: false }));
      },
      toggle() {
        set(() => ({ isOpen: !get().isOpen }));
      },
    }),
    {
      name: 'menu-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useSideBarStore = createSelectors(useSideBarStoreBase);
