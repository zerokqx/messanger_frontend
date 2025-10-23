import { useAuth } from '@/shared/model/authProviderContext';
import type { IsAuthAProp } from '../types';
export const IsAuth = ({ status = true, children }: IsAuthAProp) => {
  const isAuth = useAuth().isAuth;
  if (status === isAuth) {
    return children;
  }
};
