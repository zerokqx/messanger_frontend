import type { ProfileByUserIdResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';
import {
  getGetUserProfileByUserIdUserIdGetQueryOptions,
  getGetUserProfileByUserIdUserIdGetQueryKey,
  useGetUserProfileByUserIdUserIdGet,
} from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import type { Draft } from 'immer';
import { useCallback } from 'react';
import { UserByIdCacheDescriptor } from '../model/user-by-id-cache-descriptor';

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

type UpdateFunction = (draft: Draft<ProfileByUserIdResponse>) => void;
interface UpdateUserLocalCacheByUserIdOptions {
  useInvalidate?: boolean;
}
export const updateUserLocalCacheByUserId = async (
  queryClient: QueryClient,
  userId: string,
  updater: UpdateFunction,
  options?: UpdateUserLocalCacheByUserIdOptions
) => {
  const descriptor = UserByIdCacheDescriptor.getInstance(userId, queryClient);

  await descriptor.update(updater);

  if (options?.useInvalidate) {
    await queryClient.invalidateQueries({
      queryKey: descriptor.getUserQueryKey(),
    });
  }
};
