import { $api } from '@/shared/api/repository/$api';
import { useState } from 'react';

export const useGetUserById = () => {
  const [id, setId] = useState('');
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
  return { ...query, setId, id };
};
