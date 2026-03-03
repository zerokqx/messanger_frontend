import { $api } from '@/shared/api/repository/$api';
import { notify } from '@/shared/lib/notifications';
import { useNavigate } from '@tanstack/react-router';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const mutate = $api.queryAuth.useMutation(
    'post',
    '/register',

    {
      onSuccess: () => {
        void navigate({ to: '.', replace: true });
      },

      onError: () => {
        notify.error()
      },
    }
  );
  return { ...mutate };
};
