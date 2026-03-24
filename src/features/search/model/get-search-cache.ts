import type { UserSearchResponse } from '@/shared/api/orval/feed-service/feed-service.schemas';
import { getSearchByQueryUserSearchGetQueryKey } from '@/shared/api/orval/feed-service/v1-feed-user-search/v1-feed-user-search';
import { useQueryClient } from '@tanstack/react-query';

/**
 * @description Получает данные из кеша котоыре установил запрос. Замена zustand стору
 * @deprecated
 */
export const useSearchCache = () => {
  const client = useQueryClient();
  return client.getQueryData<UserSearchResponse>(
    getSearchByQueryUserSearchGetQueryKey({ query: '' })
  );
};
