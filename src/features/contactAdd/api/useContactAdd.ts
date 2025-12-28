import { $api } from '@/shared/api/repository/$api';
import { successNotify } from '@/shared/lib/notifications/success';
import { emitter } from '@/shared/model/mitt';
import { useQueryClient } from '@tanstack/react-query';

export const useContactAdd = () => {
  const queryClient = useQueryClient();
  const mutate = $api.jwtUser.query.useMutation('post', '/contact/add', {
    onMutate: async ({ body: { custom_name } }, context) => {},
    onSuccess(c) {
      successNotify('Контакт добавлен');
      void queryClient.invalidateQueries({
        queryKey: ['get', '/contacts/list'],
      });
      void queryClient.invalidateQueries({
        queryKey: ['contact', '/contacts/count'],
      });
    },
  });
  return mutate;
};
