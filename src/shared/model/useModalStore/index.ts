import { createSelectors } from '@/shared/lib/zustand/selectors';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UseModalGlobal } from './types/useModalGlobal.type';

/*
 * This store need for global state Modals.
 * For extesible store you need add new key (modal) to type and all.
 * */
const store = create<UseModalGlobal>()(
  devtools((set, get) => ({
    login: false,
    register: false,
    settings: false,
    password: false,
    _isKeyExist(key) {
      return key in get();
    },
    open(key) {
      if (!get()._isKeyExist(key)) return;
      set({ [key]: true });
    },
    _createPin(keyState, keyAction) {
      return () => {
        get()[keyAction](keyState);
      };
    },
    close(key) {
      if (!get()._isKeyExist(key)) return;
      set({ [key]: false });
    },
    pinOpen(key) {
      return get()._createPin(key, 'open');
    },
    pinClose(key) {
      return get()._createPin(key, 'close');
    },
    pinToggle(key) {
      return get()._createPin(key, 'toggle');
    },
    toggle(key) {
      if (!get()._isKeyExist(key)) return;
      set({ [key]: !get()[key] });
    },
  }))
);

export const useModalGlobal = createSelectors(store);
