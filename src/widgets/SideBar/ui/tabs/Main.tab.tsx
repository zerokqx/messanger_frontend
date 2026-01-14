import { SideBar } from '@/shared/ui/SideBar';
import { useTranslation } from 'react-i18next';
import { SideBarTaber, useTabSidebar } from '../../model/tab';
import { map } from 'lodash';
import { mainTabConfig } from '../../config/main-tab.config';

export const MainPage = () => {
  const { t } = useTranslation('sideBar');
  const set = useTabSidebar.useSetCurrentTab();

  return (
    <SideBarTaber.Panel value="main">
      {map(mainTabConfig, ({ i18n, icon, children, to }) => (
        <SideBar.Item
          onClick={() => {
            set(to);
          }}
          icon={icon}
        >
          {children ?? t(i18n)}
        </SideBar.Item>
      ))}
    </SideBarTaber.Panel>
  );
};
