import type { components } from '@/shared/types/v1';

export interface UseSearchStoreState {
  users: components['schemas']['SearchResponse']['data']['users'] | null;
  _lenght: number;
  query: string;
}
