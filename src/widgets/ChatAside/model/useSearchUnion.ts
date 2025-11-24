import { useSearchStore } from '@/features/search';
import type { UseSearchStoreState } from '@/features/search/types/useSearchStore.type';
import { initStores } from '@colorfy-software/zfy';
import { useSelectedUser } from './useSelectedUser';
import type { UserSearchItem } from '@/shared/types/api/schemas';

interface StoresDataType {
  search: UseSearchStoreState;
  selectedUser: UserSearchItem;
}
export const {
  stores: combinedSelectSearch,
  useStores: useCombinedSelectSearch,
} = initStores<StoresDataType>([useSearchStore, useSelectedUser]);
