import { useLogout } from '@/entities/user/model';
import { Button, Stack } from '@mantine/core';
import { LogOut } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsTabProps {
  children?: ReactNode;
}

export const SettingsTab = ({ children }: SettingsTabProps) => {
  const logout = useLogout();
  const { t } = useTranslation('settings-tab');
  return (
    <>
      <Stack>
        {children}
        <Button
          variant="light"
          leftSection={<LogOut />}
          onClick={() => {
            void logout();
          }}
        >
          {t('logout')}
        </Button>
      </Stack>
    </>
  );
};
