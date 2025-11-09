import { create } from 'zustand';
import type { UseSearchStore } from '../types/useSearchStore.type';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { dirty } from '../middleware/dirty.middleware';

const useSearchStoreBase = create<UseSearchStore>()(
  dirty((set) => ({
    dirty: false,
    users: null,
    clearUsers() {
      set({ users: null });
    },
    setUsers(users) {
      set({ users, _lenght: users?.length });
    },
    _lenght: 0,
    queryForSearch: '',
    searchOpened: false,
    setOpened(value) {
      set({ searchOpened: value });
    },
    setQuery(value) {
      set({ queryForSearch: value });
    },
    toggleSearch() {
      set((state) => ({ searchOpened: !state.searchOpened }));
    },
    closeSearch() {
      set({ searchOpened: false });
    },
    openSearch() {
      set({ searchOpened: true });
    },
  }))
);

export const useSearchStore = createSelectorHooks(useSearchStoreBase);
