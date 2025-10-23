import { useGetBorder } from '@/shared/model/useGetBorder';
import { useAuth } from '@/shared/model/authProviderContext';
import { useSettings } from './context';

export const useBorder = (size: Parameters<typeof useGetBorder>[0]) => {
  const setting = useSettings().borderElements;
  const isAuth = useAuth().isAuth;
  const bd = useGetBorder(isAuth ? (setting ? size : '0rem') : '0.1rem');
  return bd;
};
