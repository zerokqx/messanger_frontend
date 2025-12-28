import { useSearchStore } from '@/features/search';
import type { UseSearchStoreState } from '@/features/search/types/useSearchStore.type';
import { initStores } from '@colorfy-software/zfy';
import { useSelectedUser } from './useSelectedUser';
import type { IUseSelectedUserStore } from '../../../shared/model/stores/selected-user/selected-user.interface';

interface StoresDataType {
  search: UseSearchStoreState;
  selectedUser: IUseSelectedUserStore;
}
export const {
  stores: combinedSelectSearch,
  useStores: useCombinedSelectSearch,
} = initStores<StoresDataType>([useSearchStore, useSelectedUser]);
