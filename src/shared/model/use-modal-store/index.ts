import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AllModals, UseModalGlobal } from './types/use-modal-global.type';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { useCloseOpen } from './lib';

/*
 * This store need for global state Modals.
 * For extesible store you need add new key (modal) to type and all.
 * */
const store = create<UseModalGlobal>()(
  devtools((set, get, store) => ({
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
    _zIndex: {
      login: 500,
      password: 500,
      register: 500,
      settings: 500,
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
    reset() {
      set(store.getInitialState());
    },
  }))
);

export const useModalGlobal = createSelectorHooks(store);
export { useCloseOpen, type AllModals };
