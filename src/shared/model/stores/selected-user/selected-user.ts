import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';
import type { IUseSelectedUserStore } from './selected-user.interface';

/**
 * @description Store for track selected user via search.
 * Wants to data, data from `/{user_id}` endpoing backend.
 * Store have persist, can use subscribe functional and log changes in store.
 * @see  `selectedUserActions`
 * */
export const useSelectedUser = createStore<IUseSelectedUserStore>(
  'selectedUser',
  {
    user: null,
  },
  {
    persist: {
      getStorage: () => AsyncStorage,
    },
    subscribe: true,
    log: true,
  }
);

/**
 * @description Have 2 action - select (set user) and geter
 */
export const selectedUserActions = createStoreAction(
  [
    (user: IUseSelectedUserStore['user']) => {
      useSelectedUser.setState((s) => {
        s.data.user = user;
      });
    },
    () => useSelectedUser.getState().data.user,
  ],
  ['select', 'getUser']
);
