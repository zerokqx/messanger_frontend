import { useLogout } from '@/entities/user/model';
import { useAuth } from '@/shared/model/authProviderContext';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { Checkbox } from '@/shared/ui/Checkbox/ui';
import { Modal } from '@/shared/ui/Modal';
import { Button, UnstyledButton } from '@mantine/core';
import { LayoutTemplate, LogOut, UserCog } from 'lucide-react';
import { AccordionSetting } from './AccordionSettings';
import { useSettings } from '../model';
export const SettingsModal = () => {
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
    <Modal size={'xs'} keyModal="settings">
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
      <Button
        onClick={() => {
          void logout();
        }}
      >
        <LogOut />
        Выйти
      </Button>
    </Modal>
  );
};
