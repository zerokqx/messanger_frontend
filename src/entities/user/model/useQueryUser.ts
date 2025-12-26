import { queryClient } from '@/shared/api';
import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';

const queryOptions = $api.jwtProfile.query.queryOptions('get', '/me');

export const fetchMe = async () => {
  return queryClient.ensureQueryData(queryOptions);
};

export const useUserQuery = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<components['schemas']['ProfileData']>(
    queryOptions.queryKey
  );
};
