import { DisplayPermissionSettings } from '@/entities/user';
import { Flex } from '@mantine/core';
import { sidebarTab } from '../../model/tab';

export const ProfileSettingsTab = () => {
  const [Taber] = sidebarTab;

  return (
    <Taber.Panel value="profile_settings">
      <Flex direction={'column'} gap={'md'}>
        <DisplayPermissionSettings />
      </Flex>
    </Taber.Panel>
  );
};
