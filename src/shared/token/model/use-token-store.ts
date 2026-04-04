import type { UseTokenStoreState } from '../types/use-token-store.type';
import { createStore } from '@colorfy-software/zfy';

import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import { isClientSessionAuthorized } from '@/shared/api/auth-session';

const initialTokenState: UseTokenStoreState = { access: '' };

export const useTokenStore = createStore<UseTokenStoreState>(
  'token',
  initialTokenState,
  {
    subscribe: true,
    persist: {
      getStorage: () => localStorage,
    },
  }
);

export const tokenAction = createStoreAction(
  [
    (token: string) => isClientSessionAuthorized(token),
    (t: string) => {
      useTokenStore.setState((s) => ({
        ...s,
        data: {
          ...s.data,
          access: t,
        },
      }));
    },
    () => {
      useTokenStore.getState().reset();
    },

    () => useTokenStore.getState().data.access,
  ],
  ['validate', 'setToken', 'reset', 'getToken'] as const
);
