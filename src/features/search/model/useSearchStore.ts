import type { UseSearchStoreState } from '../types/useSearchStore.type';
import { createStore } from '@colorfy-software/zfy';

export const useSearchStore = createStore<UseSearchStoreState>('search', {
  query: String(),
  users: [],
  _lenght: 0,
});
