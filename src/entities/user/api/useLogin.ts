import { notifications } from '@mantine/notifications';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useUserStore } from '../model/userStore';
import { authClient } from '@/shared/api';
import { authMiddleware } from './middlewares';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = (search: ReturnType<typeof useSearch>) => {
  const { setToken } = useUserStore();
  const navigate = useNavigate();

  const mutate = authClient(authMiddleware)().useMutation('post', '/login', {
    onSuccess: ({ data }) => {
      setToken(data.access_token);
      // WARNING: need regenerate scheme openapi. In currend SchemaV1 not exists data.uuid in response /login
      // setUuid(data.uuid)
      navigate({
        to: search.location,
        search,
      });
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
  return { ...mutate };
};
