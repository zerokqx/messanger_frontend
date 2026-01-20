import { $api } from '@/shared/api/repository/$api';
import { useQueryClient } from '@tanstack/react-query';

/**
 * @description Инвалидирует за один раз count и list, contact эндпоинта
 */
export const useInvalidateContacts = () => {
  const client = useQueryClient();

  return async () => {
    await Promise.all([
      client.invalidateQueries(
        $api.jwtUser.query.queryOptions('get', '/contact/count')
      ),
      client.invalidateQueries(
        $api.jwtUser.query.queryOptions('get', '/contact/list')
      ),
    ]);
  };
};
