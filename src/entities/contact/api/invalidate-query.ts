import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { $api } from '@/shared/api/repository/$api';

/**
 * @description Инвалидирует за один раз count и list, contact эндпоинта
 */
export const useInvalidateContacts = () => {
  const client = useQueryClient();

  return useCallback(async () => {
    await Promise.all([
      client.invalidateQueries(
        $api.jwtUser.query.queryOptions('get', '/contact/count')
      ),
      client.invalidateQueries(
        $api.jwtUser.query.queryOptions('get', '/contact/list')
      ),
    ]);
  }, [client]);
};
