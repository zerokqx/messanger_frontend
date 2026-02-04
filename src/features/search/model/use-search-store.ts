import type { UseSearchStoreState } from '../types/use-search-store.type';
import { createStore } from '@colorfy-software/zfy';

/**
 * @deprecated
 */
export const useSearchStore = createStore<UseSearchStoreState>('search', {
  query: String(),
  users: [],
  _lenght: 0,
});
