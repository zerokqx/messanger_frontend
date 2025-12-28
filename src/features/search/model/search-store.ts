import { createStore } from '@colorfy-software/zfy';
import type { TUseSearchStoreState } from '../types/useSearchStore.type';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';
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
