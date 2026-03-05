import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';

const useGetSessionByIdFromCache = (id: string) => {
  const client = useQueryClient();
  const sessions = client.getQueryData<
    components['schemas']['SessionsListResponse']
  >($api.jwtAuth.query.queryOptions('get', '/sessions/list', {}).queryKey);
  const d = sessions?.data.sessions.find((session) => session.id === id);
  return d;
};

export const useGetSessionsSuspenseQuery = () => {
  return $api.jwtAuth.query.useSuspenseQuery(
    'get',
    '/sessions/list',
    {},
    {
      staleTime: 60 * 1000,
      select(data) {
        return data.data.sessions;
      },
    }
  );
};
