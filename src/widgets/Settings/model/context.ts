import { createContext, use } from 'react';
import type { UseAppSettings } from '../types/useAppSettings.type';

export const SettingsProviderContext = createContext<UseAppSettings | null>(
  null
);
export const useSettings = () => {
  const context = use(SettingsProviderContext);
  if (!context) throw new Error('Hook is not in context!');
  return context;
};

export const useSettingsField = <T>(
  callback: (context: UseAppSettings) => T
): T => {
  const context = useSettings();
  return callback(context);
};
