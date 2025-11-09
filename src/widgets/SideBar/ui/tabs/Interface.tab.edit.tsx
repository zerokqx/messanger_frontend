import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { Switch } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { sidebarTab } from '../../model/tab';

export const InterfaceEdit = () => {
  const { t } = useTranslation('sideBar');
  const [Taber] = sidebarTab;
  return (
    <Taber.Panel value="interface_edit">
      <Switch
        aria-label={t('toggle_border')}
        label={t('toggle_border')}
        description={t('toggle_border_description')}
      />
      <ThemeToggle />
    </Taber.Panel>
  );
};
