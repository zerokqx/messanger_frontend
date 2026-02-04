import type { UseTokenStoreState } from '../types/use-token-store.type';
import z from 'zod';
import { createStore } from '@colorfy-software/zfy';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
export const useTokenStore = createStore<UseTokenStoreState>(
  'token',
  { access: '' },
  {
    subscribe: true,
    persist: {
      getStorage: () => AsyncStorage,
    },
  }
);

export const tokenAction = createStoreAction(
  [
    (t: string) => z.jwt().safeParse(t).success,
    (t: string) => {
      useTokenStore.setState((s) => {
        s.data.access = t;
      });
    },
    () => {
      useTokenStore.getState().reset();
    },

    () => useTokenStore.getState().data.access,
  ],
  ['validate', 'setToken', 'reset', 'getToken'] as const
);
export const doValidateToken = (t: string) => {
  return z.jwt().safeParse(t).success;
};
