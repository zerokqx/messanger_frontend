import type { components } from '@/shared/types/v1';

export interface IUseSelectedUserStore {
  user: components['schemas']['UserSearchResult'] | null;
}

export type IUserProfile =
  | components['schemas']['ProfileByUserIdData']
  | undefined;
