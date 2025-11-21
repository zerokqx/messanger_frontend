import type { UserSearchItem } from '@/shared/types/api/schemas';
import type { components } from '@/shared/types/v1';

export interface UseSearchStoreState {
  users: UserSearchItem[] | undefined;
  _lenght: number;
  query: string;
}
