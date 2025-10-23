import { useAuth } from '@/shared/model/authProviderContext';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const { clearStore: tokenClear } = useAuth().token;
  const { clearState: userClear } = useAuth().user;
  const navigate = useNavigate();
  return () => {
    tokenClear();
    userClear();
    throw navigate({
      to: '/',
    });
  };
};
