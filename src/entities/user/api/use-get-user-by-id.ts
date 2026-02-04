import { $api } from '@/shared/api/repository/$api';
import { usePrevious } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const useAbortGetUserById = (id: string) => {
  const client = useQueryClient();
  return () => client.cancelQueries({ queryKey: ['get', id] });
};

export const useGetUserById = () => {
  const [id, setId] = useState('');
  const previous = usePrevious(id);
  const abortPrevious = useAbortGetUserById(previous ?? '');

  const query = $api.jwtProfile.query.useQuery(
    'get',
    '/{user_id}',

    {
      params: {
        path: {
          user_id: id,
        },
      },
    },
    { enabled: !!id, select: (data) => data.data }
  );
  return { ...query, setId, id, abortPrevious };
};
