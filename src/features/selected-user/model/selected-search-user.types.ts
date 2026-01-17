import type { components } from '@/shared/types/v1';
import type { OverrideProperties } from 'type-fest';

export interface ISelectedSearchUser {
  user: OverrideProperties<
    components['schemas']['UserSearchResult'],
    {
      profile: components['schemas']['ProfileByUserIdData'];
    }
  > | null;
}
