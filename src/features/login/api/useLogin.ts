import { useTokenStore } from '@/entities/token/@x/user';
import { authMiddleware } from '@/entities/user';
import { authClient } from '@/shared/api';
import { notifications } from '@mantine/notifications';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = () => {
  const { setToken } = useTokenStore();
  const mutate = authClient(authMiddleware)().useMutation('post', '/login', {
    onSuccess:  ({ data }) => {
      setToken(data.access_token);
    },
    onError: () => {
      console.log(mutate.error);
      notifications.show({
        title: 'Опа ошибка!',
        message:
          'Не пережевайте - это на нашей стороне скоро все будет исправлено',
        color: 'red',
      });
    },
  });

  return { ...mutate };
};
