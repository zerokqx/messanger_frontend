import { authClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';
import { notifications } from '@mantine/notifications';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */

export const useLogin = () => {
  const setToken = useAuth().token.setToken;
  const mutate = authClient()().useMutation('post', '/login', {
    onSuccess: ({ data }) => {
      setToken(data.access_token);
    },

    onError: () => {
      notifications.show({
        title: 'Опа ошибка!',
        message:
          'Не пережевайте - это на нашей стороне скоро все будет исправлено',
        color: 'red',
      });
    },
  });
  return mutate;
};
