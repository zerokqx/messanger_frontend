import type { components } from '@/shared/types/v1';

export type UseSearchStoreState =
  components['schemas']['UserSearchResponse']['data']['users'];

export type TUseSearchStoreState = UseSearchStoreState;
