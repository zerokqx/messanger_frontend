import type { TUserState } from '../types/user-store.type';
import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUser } from './mockUser';
import { createStoreAction } from '@/shared/lib/zustand/createStoreAction/createStoreAction';
export const useUserStore = createStore<TUserState>('user', mockUser, {
  persist: {
    getStorage: () => AsyncStorage,
  },
});

export const userAction = createStoreAction(
  [
    () => {
      useUserStore.getState().reset();
    },
    (user: TUserState) => {
      useUserStore.setState((s) => {
        s.data = user;
      });
    },
    (uuid: string) => useUserStore.getState().data.user_id === uuid,
  ],
  ['reset', 'init', 'isThatMe'] as const
);
