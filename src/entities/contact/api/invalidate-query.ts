import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
  getGetContactCountContactCountGetQueryKey,
  getGetContactsContactListGetInfiniteQueryKey,
} from '@/shared/api/orval/user-service/v1-user/v1-user';

/**
 * @description Инвалидирует за один раз count и list, contact эндпоинта
 */
export const useInvalidateContacts = () => {
  const client = useQueryClient();

  return useCallback(async () => {
    await Promise.all([
      client.invalidateQueries({
        queryKey: getGetContactsContactListGetInfiniteQueryKey(),
      }),
      client.invalidateQueries({
        queryKey: getGetContactCountContactCountGetQueryKey(),
      }),
    ]);
  }, [client]);
};
