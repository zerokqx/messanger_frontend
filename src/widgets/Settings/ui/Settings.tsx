import { useLogout } from '@/entities/user/model';
import { useAppSettings } from '@/shared/lib/settings/model/useAppSettings';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox/ui';
import { Modal } from '@/shared/ui/Modal';
import { LogOut } from 'lucide-react';
import { useSettingsStore } from '../model';
export const SettingsModal = () => {
  const logout = useLogout();
  const {
    permanentPanel,
    setPermanentPanel,
    borderElements,
    setborderElements,

  } = useAppSettings();
  const {isOpen,close} = useSettingsStore()
  return (

    <Modal opened={isOpen} onClose={close}>
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
      <CustomMantineButton onClick={logout}>
        <LogOut />
        Выйти
      </CustomMantineButton>
    </Modal>
  );
};
