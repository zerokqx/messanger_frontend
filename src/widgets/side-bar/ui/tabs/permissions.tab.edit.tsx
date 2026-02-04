import { DisplayPermissionSettings } from '@/entities/user';
import { Flex } from '@mantine/core';
import { SideBarTaber } from '../../model/tab';

export const ProfileSettingsTab = () => {
  return (
    <SideBarTaber.Panel value="profile_settings">
      <DisplayPermissionSettings />
    </SideBarTaber.Panel>
  );
};
