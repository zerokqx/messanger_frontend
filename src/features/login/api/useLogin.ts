import { authClient, queryClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';
import { notifications } from '@mantine/notifications';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */

export const useLogin = () => {
  const setToken = useAuth().token.setToken;
  const mutate = authClient()().useMutation('post', '/login', {
    onSuccess: (response) => {
      console.log('Full response:', response); // Посмотри что тут!

      // Безопасная проверка
      if (!response.data.access_token) {
        console.error('Token not found in response!', response);
        notifications.show({
          title: 'Ошибка',
          message: 'Токен не получен от сервера',
          color: 'red',
        });
        return;
      }

      setToken(response.data.access_token);
      // window.location.reload();
    },

    onError: (error) => {
      console.log(error);
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
