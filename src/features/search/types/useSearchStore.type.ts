import type { components } from '@/shared/types/v1';

export interface UseSearchStoreState {
  users: components['schemas']['SearchResponse']['data']['users'] | null;
  _lenght: number;
  queryForSearch: string;
  searchOpened: boolean;
}
export interface UseSearchStoreAction {
  clearUsers: () => void;
  setUsers: (users: UseSearchStoreState['users']) => void;
  setOpened: (value: UseSearchStoreState['searchOpened']) => void;
  setQuery: (value: UseSearchStoreState['queryForSearch']) => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  openSearch: () => void;
}
export type UseSearchStore = UseSearchStoreAction & UseSearchStoreState;
