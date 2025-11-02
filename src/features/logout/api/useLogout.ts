import { useAuth } from '@/shared/model/authProviderContext';

export const useLogout = () => {
  const { clearStore: tokenClear } = useAuth().token;
  const { clearState: userClear } = useAuth().user;
  return () => {
    tokenClear();
    userClear();
    window.location.reload();
  };
};
