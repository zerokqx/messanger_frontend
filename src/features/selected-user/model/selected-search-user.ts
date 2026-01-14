import { createStore } from '@colorfy-software/zfy';
import type { ISelectedSearchUser } from './selected-search-user.types';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';

export const useSelectedSearchUser = createStore<ISelectedSearchUser>(
  'selected-search-user',
  { user: null },
  { log: true }
);

export const selectedUserAction = createStoreAction(
  [
    () => useSelectedSearchUser.getState().data.user,
    () => useSelectedSearchUser.getState().reset,
    (user: NonNullable<ISelectedSearchUser['user']>) => {
      useSelectedSearchUser.setState((s) => {
        s.data.user = user;
      });
    },
  ],
  ['get', 'reset', 'select']
);
