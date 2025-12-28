import { createStore } from '@colorfy-software/zfy';
import type { TUseSearchStoreState } from '../types/useSearchStore.type';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';

export const useSearchStore = createStore<TUseSearchStoreState>(
  'search store',
  []
);

export const searchStoreAction = createStoreAction(
  [
    (users: TUseSearchStoreState) => {
      useSearchStore.setState((s) => {
        s.data = users;
      });
    },
    () => useSearchStore.getState().data,
  ],
  ['setUsers', 'getUsers']
);
