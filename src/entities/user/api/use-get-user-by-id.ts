import {
  getGetUserProfileByUserIdUserIdGetQueryOptions,
  getGetUserProfileByUserIdUserIdGetQueryKey,
  useGetUserProfileByUserIdUserIdGet,
} from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

interface UseGetUserByIdArgs {
  id: string;
}
export const makeGetUserById = (id: UseGetUserByIdArgs['id'] = '') => {
  return getGetUserProfileByUserIdUserIdGetQueryOptions(id);
};

export const useInvalidateUserById = ({
  id,
}: UseGetUserByIdArgs): (() => Promise<void>) => {
  const client = useQueryClient();
  return useCallback(async () => {
    await client.invalidateQueries({
      queryKey: getGetUserProfileByUserIdUserIdGetQueryKey(id),
    });
  }, [id, client]);
};

export const useGetUserById = ({ id }: UseGetUserByIdArgs) => {
  const client = useQueryClient();

  /**
   * @deprecated
   * @see useInvalidateUserById
   * */
  const invalidateUser = useCallback(() => {
    void client.invalidateQueries({
      queryKey: getGetUserProfileByUserIdUserIdGetQueryKey(id),
    });
  }, [id, client]);

  const query = useGetUserProfileByUserIdUserIdGet(id, {
    query: {
      enabled: !!id,
      select: (data) => data.data,
      staleTime: 25 * 1000,
    },
  });

  return { ...query, invalidateUser };
};
