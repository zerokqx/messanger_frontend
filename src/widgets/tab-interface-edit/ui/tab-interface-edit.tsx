import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { SideBarTaber } from '@/widgets/side-bar/model/tab';
import { Switch } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const InterfaceEditTab = () => {
  const { t } = useTranslation('sideBar');
  return (
    <>
      <Switch
        aria-label={t('toggle_border')}
        label={t('toggle_border')}
        description={t('toggle_border_description')}
      />
      <ThemeToggle />
    </>
  );
};
