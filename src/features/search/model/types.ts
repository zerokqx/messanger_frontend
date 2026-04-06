import type { UserSearchResponse } from '@/shared/api/orval/feed-service/feed-service.schemas';

export type TUseSearchStoreState =
  UserSearchResponse['data']['users'];
