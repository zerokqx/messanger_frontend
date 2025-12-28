import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';

/**
 * @description Получает данные из кеша котоыре установил запрос. Замена zustand стору
 * @deprecated
 */
export const useSearchCache = () => {
  const client = useQueryClient();
  return client.getQueryData<components['schemas']['UserSearchResponse']>(
    $api.jwtFeed.query.queryOptions('get', '/user/search', {
      params: {
        query: {
          query: '',
        },
      },
    }).queryKey
  );
};



