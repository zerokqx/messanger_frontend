import type { components } from '@/shared/types/v1';

export interface ISelectedSearchUser {
  user: components['schemas']['UserSearchResult'] | null;
}
