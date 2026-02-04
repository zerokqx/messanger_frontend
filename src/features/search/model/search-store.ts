import { createStore } from '@colorfy-software/zfy';
import type { TUseSearchStoreState } from '../types/use-search-store.type';
import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import Logger from '@/shared/lib/logger/logger';

export const useSearchStore = createStore<TUseSearchStoreState>(
  'search store',
  []
);

export const searchStoreAction = createStoreAction(
  [
    (users: TUseSearchStoreState) => {
      useSearchStore.setState((s) => {
        Logger.debug('search-store', 'setUsers', users);
        s.data = users;
      });
    },
    () => useSearchStore.getState().data,
  ],
  ['setUsers', 'getUsers']
);
