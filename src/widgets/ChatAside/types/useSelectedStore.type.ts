import type { components } from '@/shared/types/v1';

export interface UseSelectedStore {
  profile: components['schemas']['UserSearchResponse']['data']['users'][number]['profile'];
  user_id: string;
}
