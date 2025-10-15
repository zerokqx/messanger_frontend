import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UseSettingStore } from './types';

export const createIsOpenStore = (): UseBoundStore<
  StoreApi<UseSettingStore>
> => {
  return create<UseSettingStore>()(
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
};
