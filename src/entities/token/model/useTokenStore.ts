import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { UseTokenStore } from '../types/useTokenStore.type';
import z from 'zod';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useTokenStoreBase = create<UseTokenStore>()(
  devtools(
    persist(
      (set, get, store) => ({
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
      }),
      {
        name: 'token-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
export const useTokenStore = createSelectors(useTokenStoreBase);
