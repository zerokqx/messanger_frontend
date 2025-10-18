import { authClient } from '@/shared/api';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useRegister = () => {
  const navigate = useNavigate();

  const mutate = authClient()().useMutation(
    'post',
    '/register',

    {
      onSuccess: ({ data }) => {
void navigate({to:'.',replace:true})
      },

      onError: () => {
        notifications.show({
          title: 'Опа ошибка!',
          message:
            'Не пережевайте - это на нашей стороне скоро все будет исправлено',
          color: 'red',
        });
      },
    }
  );
  return { ...mutate };
};
