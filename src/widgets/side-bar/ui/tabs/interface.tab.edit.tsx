import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { Switch } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SideBarTaber } from '../../model/tab';

export const InterfaceEdit = () => {
  const { t } = useTranslation('sideBar');
  return (
    <SideBarTaber.Panel value="interface_edit">
      <Switch
        aria-label={t('toggle_border')}
        label={t('toggle_border')}
        description={t('toggle_border_description')}
      />
      <ThemeToggle />
    </SideBarTaber.Panel>
  );
};
