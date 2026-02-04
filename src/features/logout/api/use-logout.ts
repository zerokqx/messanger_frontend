import { tokenAction } from '@/shared/token';
import { userAction } from '@/entities/user/model/user-store';
import { useRouter } from '@tanstack/react-router';

export const useLogout = () => {
  const router = useRouter();
  return async () => {
    tokenAction.doReset();
    userAction.doReset();
    await router.navigate({ to: '/auth' });
    await router.invalidate();
  };
};
