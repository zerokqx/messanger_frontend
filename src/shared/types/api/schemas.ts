import type { components } from '../v1';

type User =
  components['schemas']['UserSearchResponse']['data']['users'][number];

export interface UserWithUUID extends User {
  profile: components['schemas']['ProfileResponse']['data'];
}
