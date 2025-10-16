import { useLogout } from '@/entities/user/model';
import { useAppSettings } from '@/shared/lib/settings/model/useAppSettings';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox/ui';
import { Modal } from '@/shared/ui/Modal';
import { LogOut } from 'lucide-react';
export const SettingsModal = () => {
  const logout = useLogout();
  const {
    permanentPanel,
    setPermanentPanel,
    borderElements,
    setborderElements,
  } = useAppSettings();
  return (
    <Modal>
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
