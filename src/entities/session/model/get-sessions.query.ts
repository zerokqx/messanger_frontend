import type { SessionsListResponse } from '@/shared/api/orval/auth-service/auth-service.schemas';
import {
  getSessionsListSessionsListGetQueryKey,
  getSessionsListSessionsListGetQueryOptions,
} from '@/shared/api/orval/auth-service/v1-auth/v1-auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetSessionByIdFromCache = (id: string) => {
  const client = useQueryClient();
  const sessions =
    client.getQueryData<SessionsListResponse>(
      getSessionsListSessionsListGetQueryKey()
    );
  const d = sessions?.data.sessions.find((session) => session.id === id);
  return d;
};

export const useGetSessionsSuspenseQuery = () => {
  return useQuery(
    getSessionsListSessionsListGetQueryOptions({
      query: {
        staleTime: 60 * 1000,
        select(data) {
          return data.data.sessions;
        },
      },
    })
  );
};
