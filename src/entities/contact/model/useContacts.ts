import type { UserSearchItem } from '@/shared/types/api/schemas';
import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UnknownRecord } from 'type-fest';

export interface UseContactsStore<U extends string[] = string[]> {
  has_more: boolean | undefined;
  uuids: U | never[];
  users: Record<U[number], UserSearchItem> | UnknownRecord;
}
export const useContacts = createStore<UseContactsStore>(
  'contacts',
  {
    has_more: true,
    users: {},
    uuids: [],
  },
  {
    persist: { getStorage: () => AsyncStorage },
    log: true,
  }
);
