import { useGetBorder } from '@/shared/model/useGetBorder';
import { useAppSettings } from '../../model';

export const useBorder = (size: Parameters<typeof useGetBorder>[0]) => {
  const setting = useAppSettings((s) => s.borderElements);
  const bd = useGetBorder(setting ? size : '0rem');
  return bd;
};
