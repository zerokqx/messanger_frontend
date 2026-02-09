import { DisplayPermissionSettings } from '@/entities/user';
import { SideBarTaber } from '@/widgets/side-bar/model/tab';

export const ProfileSettingsTab = () => {
  return (
    <SideBarTaber.Panel value="profile_settings">
      <DisplayPermissionSettings />
    </SideBarTaber.Panel>
  );
};
