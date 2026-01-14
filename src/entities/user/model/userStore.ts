import type { TUserState } from '../types/user-store.type';
import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';

/**
 * @deprecated
 */
export const useUserStore = createStore<{ user: TUserState | null }>(
  'user',
  {
    user: null,
  },
  {
    persist: {
      getStorage: () => AsyncStorage,
    },
  }
);

export const userAction = createStoreAction(
  [
    () => {
      useUserStore.getState().reset();
    },
    (user: TUserState) => {
      useUserStore.setState((s) => {
        s.data.user = user;
      });
    },
    (uuid: string) => useUserStore.getState().data.user?.user_id === uuid,
  ],
  ['reset', 'init', 'isThatMe'] as const
);
