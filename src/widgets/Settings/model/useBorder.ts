import { useAuth } from '@/shared/model/authProviderContext';
import { useGetBorder } from '@/shared/model/useGetBorder';
import { useSettingsField } from './context';

export const useBorder = (
  size: Parameters<typeof useGetBorder>[0],
  color?: string,
  type?: string
) => {
  const isAuth = useAuth().isAuth;
  const setting = useSettingsField((c) => c.borderElements);
  const bd = useGetBorder(isAuth ? (setting ? size : '0rem') : '0.1rem');
  const devide = ' ';
  const newColor = bd.split(devide);
  if (type) newColor.splice(1, 1, type);
  if (color && color !== 'default') {
    newColor.pop();
    newColor.push(color);
    return newColor.join(devide);
  }
  return newColor.join(devide);
};
