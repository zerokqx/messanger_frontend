import { create } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';
import type {
  UseTokenStore,
  UseTokenStoreState,
} from '../types/useTokenStore.type';
import z from 'zod';
import { createSelectors } from '@/shared/lib/zustand/selectors';
import { validateToken } from './middleware';
import localforage from 'localforage';
import { createStore } from '@colorfy-software/zfy';

import AsyncStorage from '@react-native-async-storage/async-storage';
const useTokenStoreBase = create<UseTokenStore>()(
  devtools(
    persist(
      validateToken((set, get, store) => ({
        access: '',
        setToken(token) {
          set(() => ({ access: token }));
        },
        validateToken(token) {
          return z.jwt().safeParse(token ?? get().access).success;
        },
        clearStore() {
          set(store.getInitialState());
        },
      })),

      {
        name: 'token-storage',
        storage: createJSONStorage(() => localforage),
      }
    )
  )
);

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

export const doValidateToken = (t: string) => {
  return z.jwt().safeParse(t).success;
};
