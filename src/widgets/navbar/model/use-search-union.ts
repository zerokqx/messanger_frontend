import { useSearchStore } from '@/features/search';
import type { UseSearchStoreState } from '@/features/search';
import { initStores } from '@colorfy-software/zfy';
import { useSelectedUser } from './use-selected-user';
import type { IUseSelectedUserStore } from '../../../shared/model/stores/selected-user/selected-user.interface';

interface StoresDataType {
  search: UseSearchStoreState;
  selectedUser: IUseSelectedUserStore;
}
export const {
  stores: combinedSelectSearch,
  useStores: useCombinedSelectSearch,
} = initStores<StoresDataType>([useSearchStore, useSelectedUser]);
