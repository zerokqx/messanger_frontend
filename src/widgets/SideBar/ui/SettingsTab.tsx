import { useLogout } from '@/entities/user/model';
import { useAuth } from '@/shared/model/authProviderContext';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox/ui';
import { Button, Flex, List, ThemeIcon, UnstyledButton } from '@mantine/core';
import { LayoutTemplate, LogOut, UserCog } from 'lucide-react';
import { sidebarTab } from '../model/tab';
import { useSettings } from '@/widgets/Settings';
import { AccordionSetting } from '@/widgets/Settings/ui/AccordionSettings';
import { IsAuth } from '@/features/checkAuth/ui';
import { DisplayPermissionSettings } from '@/entities/user';
import { useTranslation } from 'react-i18next';
import { WithIcon } from '@/shared/ui/WithIcon';
import { SideBar } from '@/shared/ui/SideBar';

export const Settings = () => {
  const { t } = useTranslation('ns1');
  const [Taber, useStore] = sidebarTab;
  const set = useStore.useSetCurrentTab();
  const logout = useLogout();
  const {
    permanentPanel,
    setPermanentPanel,
    borderElements,
    setborderElements,
  } = useSettings();
  const userName = useAuth((s) => s.user.login);
  const passwordChangeOpen = useModalGlobal((s) => s.pinOpen)('password');

  return (
    <Taber.Panel value="settings">
      <SideBar.Item
        onClick={() => {
          set('profile_settings');
        }}
        text={t('button.profile_settings')}
      >
        <UserCog />
      </SideBar.Item>
      <AccordionSetting icon={LayoutTemplate} label="Интерфейс">
        <Checkbox
          checked={borderElements}
          label="Включить обводку элементов"
          onChange={(e) => {
            setborderElements(e.currentTarget.checked);
          }}
        />
        <Checkbox
          checked={permanentPanel}
          label="Постояная боковая панель"
          onChange={(e) => {
            setPermanentPanel(e.currentTarget.checked);
          }}
        />
      </AccordionSetting>

      <AccordionSetting icon={UserCog} label={`Пользователь ${userName}`}>
        <UnstyledButton onClick={passwordChangeOpen}>
          Сменить пароль
        </UnstyledButton>
      </AccordionSetting>

      <CustomMantineButton onClick={logout}>
        <LogOut />
        Выйти
      </CustomMantineButton>
    </Taber.Panel>
  );
};
