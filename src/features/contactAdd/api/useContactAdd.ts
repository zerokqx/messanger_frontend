import { $api } from '@/shared/api/repository/$api';
import { successNotify } from '@/shared/lib/notifications/success';
import { useQueryClient } from '@tanstack/react-query';

export const useContactAdd = (contactName: string) => {
  const queryClient = useQueryClient();
  const mutate = $api.jwtUser.query.useMutation('post', '/contact/add', {
    onSuccess(c) {
      successNotify(`${contactName} добавлен в ваши контакты`);
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
