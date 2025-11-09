import { useGetBorder } from '@/shared/model/useGetBorder';
import { useSettingsField } from './context';
export const useBorder = (
  size: Parameters<typeof useGetBorder>[0],
  color?: string,
  type?: string
) => {
  const setting = useSettingsField((c) => c.borderElements);
  const bd = useGetBorder(setting ? size : '0rem');
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
