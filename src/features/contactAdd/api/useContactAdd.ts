import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';

export const useContactAdd = () => {
  const mutate = userClient(authMiddleware)().useMutation(
    'post',
    '/contact/add',
    {
      onError() {},
    }
  );
};
