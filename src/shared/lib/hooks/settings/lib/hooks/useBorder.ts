import { useGetBorder } from '@/shared/model/useGetBorder';
import { useSettings } from '../../model/context';
import { useCheckAuth } from '@/features/checkAuth';

export const useBorder = (size: Parameters<typeof useGetBorder>[0]) => {
  const setting = useSettings()((s) => s.borderElements);
  const isAuth = useCheckAuth();
  const bd = useGetBorder(isAuth ? (setting ? size : '0rem') : '0.1rem');
  return bd;
};
