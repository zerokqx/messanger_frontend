import { useLogout, useUserStore } from '@/entities/user/model';
import { useAppSettings } from '@/shared/lib/settings/model/useAppSettings';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox/ui';
import { Modal } from '@/shared/ui/Modal';
import {
  ChangePasswordModal,
  useChangePasswordModal,
} from '@/widgets/ChangePasswordModal';
import { UnstyledButton } from '@mantine/core';
import { LayoutTemplate, LogOut, UserCog } from 'lucide-react';
import { useSettingsStore } from '../model';
import { AccordionSetting } from './AccordionSettings';
export const SettingsModal = () => {
  const logout = useLogout();
  const {
    permanentPanel,
    setPermanentPanel,
    borderElements,
    setborderElements,
  } = useAppSettings();
  const store = useSettingsStore();
  const password = useChangePasswordModal();
  const userName = useUserStore((state) => state.login);
  return (
    <Modal size={'xs'} store={store}>
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
      <ChangePasswordModal h={'30vh'} />
      <AccordionSetting icon={UserCog} label={`Пользователь ${userName}`}>
        <UnstyledButton onClick={password.toggle}>
          Сменить пароль
        </UnstyledButton>
      </AccordionSetting>
      <CustomMantineButton onClick={logout}>
        <LogOut />
        Выйти
      </CustomMantineButton>
    </Modal>
  );
};
