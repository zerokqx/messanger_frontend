import type { ReactNode } from 'react';
import { SettingsProviderContext } from './context';
import { useAppSettings } from './useAppSettings';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const settings = useAppSettings();

  return (
    <SettingsProviderContext value={settings}>
      {children}
    </SettingsProviderContext>
  );
};
