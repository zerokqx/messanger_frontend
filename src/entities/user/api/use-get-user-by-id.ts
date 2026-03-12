import { $api } from '@/shared/api/repository/$api';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

interface UseGetUserByIdArgs {
  id: string;
}
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

  const query = $api.profile.jwt.useQuery(
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
