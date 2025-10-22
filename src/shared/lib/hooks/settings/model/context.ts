import { createContext, use } from 'react';
import { useAppSettings } from './useAppSettings';

export const SettingsPovider =
  createContext<typeof useAppSettings>(useAppSettings);
export const useSettings = () => {
  const context = use(SettingsPovider);
  return context;
};
