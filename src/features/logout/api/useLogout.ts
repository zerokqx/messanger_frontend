import { tokenAction } from '@/shared/token';
import { userAction } from '@/entities/user/model/userStore';
import { useRouter } from '@tanstack/react-router';

export const useLogout = () => {
  const router = useRouter();
  return () => {
    tokenAction.doReset();
    userAction.doReset();
    void router.invalidate();
  };
};
