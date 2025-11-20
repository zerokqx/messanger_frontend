import type { TUserState, UserStore } from '../types/userStore.type';
import { createStore, type StoreType } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUser } from './mockUser';
export const useUserStore = createStore<TUserState>('user', mockUser, {
  persist: {
    getStorage: () => AsyncStorage,
  },
});

export const doInit = (user: TUserState) => {
  useUserStore.setState(() => ({ data: user }));
};
