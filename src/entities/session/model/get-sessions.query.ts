import { $api } from '@/shared/api/repository/$api';

export const useGetSessionsQuery = () => {
  return $api.jwtAuth.query.useQuery(
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
