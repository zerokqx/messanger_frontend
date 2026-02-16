import type { components } from '@/shared/types/v1';

export type TUseSearchStoreState =
  components['schemas']['UserSearchResponse']['data']['users'];

export interface UseSearchStoreState {
  query: string;
  users: TUseSearchStoreState;
  _lenght: number;
}
