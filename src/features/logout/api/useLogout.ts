import { useTokenStore } from '@/entities/token';
import { useUserStore } from '@/entities/user';
import { useRouter } from '@tanstack/react-router';

export const useLogout = () => {
  const router = useRouter();
  const tokenReset = useTokenStore((s) => s.reset);
  const userReset = useUserStore((s) => s.reset);
  return () => {
    tokenReset();
    userReset();
    void router.invalidate();
  };
};
