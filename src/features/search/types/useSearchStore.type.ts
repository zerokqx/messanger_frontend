import type { UserSearchItem } from '@/shared/types/api/schemas';
import type { components } from '@/shared/types/v1';

export interface UseSearchStoreState {
  users: UserSearchItem[] | null;
  _lenght: number;
  query: string;
}
