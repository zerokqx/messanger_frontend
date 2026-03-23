import {  $profileService } from '@/shared/api/generated';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

interface UseGetUserByIdArgs {
  id: string;
}
export const makeGetUserById = (id: UseGetUserByIdArgs['id'] = '') => {
  return $profileService.queryOptions('get', '/{user_id}', {
    params: {
      path: { user_id: id,
      },
    },
  });
};

export const useGetUserById = ({ id }: UseGetUserByIdArgs) => {
  const client = useQueryClient();

  const invalidateUser = useCallback(() => {
    void client.invalidateQueries({
      queryKey: [
        'get',
        '/{user_id}',
        {
          params: {
            path: {
              user_id: id,
            },
          },
        },
      ],
    });
  }, [id, client]);

  const query = $profileService.useQuery(
    'get',
    '/{user_id}',
    {
      params: {
        path: {
          user_id: id,
        },
      },
    },
    { enabled: !!id, select: (data) => data.data, staleTime: 25 * 1000 }
  );

  return { ...query, invalidateUser };
};
