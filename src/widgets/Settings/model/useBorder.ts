import { useAuth } from '@/shared/model/authProviderContext';
import { useGetBorder } from '@/shared/model/useGetBorder';
import { useSettingsField } from './context';

export const useBorder = (size: Parameters<typeof useGetBorder>[0]) => {
  const isAuth = useAuth().isAuth;
  const setting = useSettingsField((c) => c.borderElements);
  const bd = useGetBorder(isAuth ? (setting ? size : '0rem') : '0.1rem');
  return bd;
};
