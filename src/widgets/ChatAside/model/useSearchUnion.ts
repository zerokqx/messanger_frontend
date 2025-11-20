import type { TUserState } from '@/entities/user/types/userStore.type';
import { useSearchStore } from '@/features/search';
import type { UseSearchStoreState } from '@/features/search/types/useSearchStore.type';
import { initStores } from '@colorfy-software/zfy';
import { useSelectedUser } from './useSelectedUser';
import type { UseSelectedStore } from '../types/useSelectedStore.type';

interface StoresDataType {
  search: UseSearchStoreState;
  selectedUser: UseSelectedStore;
}
export const {
  stores: combinedSelectSearch,
  useStores: useCombinedSelectSearch,
} = initStores<StoresDataType>([useSearchStore, useSelectedUser]);
