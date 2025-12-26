import { queryClient, userClient } from '@/shared/api';
import { $api } from '@/shared/api/repository/$api';
import { successNotify } from '@/shared/lib/notifications/success';
import { emitter } from '@/shared/model/mitt';

export const useContactAdd = () => {
  const mutate = $api.jwtUser.query.useMutation('post', '/contact/add', {
    onSuccess() {
      successNotify('Контакт добавлен');
      emitter.emit('contacts', 'refetch');
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
