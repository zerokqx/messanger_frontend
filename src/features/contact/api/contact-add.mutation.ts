import { $api } from '@/shared/api/repository/$api';
import { successNotify } from '@/shared/lib/notifications/success';
import { useQueryClient } from '@tanstack/react-query';

export const useContactAdd = () => {
  const queryClient = useQueryClient();
  const mutate = $api.jwtUser.query.useMutation('post', '/contact/add', {
    async onSuccess() {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get', '/contacts/list'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['contact', '/contacts/count'],
        }),
      ]);
    },
  });
  return mutate;
};
