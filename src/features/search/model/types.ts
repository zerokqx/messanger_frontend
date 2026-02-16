import type { components } from '@/shared/types/v1';

export type SearchUsersState =
  components['schemas']['UserSearchResponse']['data']['users'];

export type UseSearchStoreState = SearchUsersState;
export type TUseSearchStoreState = SearchUsersState;
