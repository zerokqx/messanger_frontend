import { useLogout } from '@/entities/user/model';
import { useAuth } from '@/shared/model/authProviderContext';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox/ui';
import { SideBar } from '@/shared/ui/SideBar';
import { useSettings } from '@/widgets/Settings';
import { AccordionSetting } from '@/widgets/Settings/ui/AccordionSettings';
import { UnstyledButton } from '@mantine/core';
import { LayoutTemplate, LogOut, UserCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sidebarTab } from '../model/tab';

export const Settings = () => {
  const [Taber, useStore] = sidebarTab;
  const set = useStore.useSetCurrentTab();
  const logout = useLogout();
  const { borderElements, setborderElements } = useSettings();
  const userName = useAuth((s) => s.user.login);
  const { t } = useTranslation('sideBar');
  const passwordChangeOpen = useModalGlobal((s) => s.pinOpen)('password');

  return (
    <Taber.Panel value="settings">
      <SideBar.Item
        onClick={() => {
          set('profile_settings');
        }}
        text={t('profile_settings')}
      >
        <UserCog />
      </SideBar.Item>
      <AccordionSetting icon={LayoutTemplate} label="Интерфейс">
        <Checkbox
          checked={borderElements}
          label={t('turn_up_border_elements')}
          onChange={(e) => {
            setborderElements(e.currentTarget.checked);
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
