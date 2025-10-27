import { create } from 'zustand';
import type { UseSearchStore } from '../types/useSearchStore.type';
import { createSelectors } from '@/shared/lib/zustand/selectors';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';

const useSearchStoreBase = create<UseSearchStore>()((set) => ({
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
}));
export const useSearchStore = createSelectorHooks(useSearchStoreBase);
