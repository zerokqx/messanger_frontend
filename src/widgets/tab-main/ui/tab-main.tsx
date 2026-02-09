import { SideBar } from '@/shared/ui/side-bar';
import { mainTabConfig } from '@/widgets/side-bar/config/main-tab.config';
import { SideBarTaber, useTabSidebar } from '@/widgets/side-bar/model/tab';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';

export const MainTab = () => {
  const { t } = useTranslation('sideBar');
  const set = useTabSidebar.useSetCurrentTab();

  return (
    <SideBarTaber.Panel value="main">
      {map(mainTabConfig, ({ i18n, icon, children, to }) => (
        <SideBar.Item
          key={to}
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
