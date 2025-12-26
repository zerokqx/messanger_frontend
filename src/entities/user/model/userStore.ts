import type { TUserState, UserStore } from '../types/userStore.type';
import { createStore, type StoreType } from '@colorfy-software/zfy';
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

export const doInit = (user: TUserState) => {
  useUserStore.setState(() => ({ data: user }));
};
