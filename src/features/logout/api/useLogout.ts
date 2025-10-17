import { useTokenStore } from '@/entities/token';
import { useUserStore } from '@/entities/user';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const { clearStore: tokenClear } = useTokenStore();
  const { clearState: userClear } = useUserStore();
  const navigate = useNavigate();
  return () => {
    tokenClear();
    userClear();
    throw navigate({
      to: '/',
    });
  };
};
