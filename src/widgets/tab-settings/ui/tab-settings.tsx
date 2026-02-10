import { useLogout } from '@/entities/user/model';
import { NuqsTabs, useNuqsTab } from '@/shared/ui/nuqs-base-tabs';
import { SideBar } from '@/shared/ui/side-bar';
import { useTabSidebar } from '@/widgets/side-bar/model/tab';
import { Button, Stack } from '@mantine/core';
import { LayoutTemplate, List, LogOut, UserCog } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsTabProps {
  children?: ReactNode;
}

export const SettingsTab = ({ children }: SettingsTabProps) => {
  const [, set] = useNuqsTab('tsettings');
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
