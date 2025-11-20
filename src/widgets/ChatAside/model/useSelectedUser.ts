import { mockUser } from '@/entities/user';
import { createStore } from '@colorfy-software/zfy';
import type { UseSelectedStore } from '../types/useSelectedStore.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSelectedUser = createStore<UseSelectedStore>(
  'selectedUser',
  {
    profile: mockUser,
    user_id: '',
  },
  {
    persist: {
      getStorage: () => AsyncStorage,
    },
    subscribe: true,
    log: true,
  }
);
