import { useRegisterRegisterPost } from '@/shared/api/orval/auth-service/v1-auth/v1-auth';
import { notify } from '@/shared/lib/notifications';
import { useNavigate } from '@tanstack/react-router';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const mutate = useRegisterRegisterPost({
    mutation: {
      onSuccess: () => {
        void navigate({ to: '.', replace: true });
      },

      onError: () => {
        notify.error();
      },
    },
  });
  return { ...mutate };
};
