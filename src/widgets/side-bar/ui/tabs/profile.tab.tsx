import { ActionIcon, Button, Center, Group, Space } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { SideBarTaber, useTabSidebar } from '../../model/tab';
import { useMe } from '@/entities/user/model/me.query';
import { ProfileForCurrentUser } from '@/entities/user';

export const Profile = () => {
  const set = useTabSidebar.useSetCurrentTab();

  const { data: user } = useMe();

  return (
    <SideBarTaber.Panel value="profile">
      {user && (
        <>
          <ProfileForCurrentUser profile={user} />
          <Space h={'1rem'} />
          <Group w={'100%'} justify="end">
            <ActionIcon
              onClick={() => {
                set('profile_edit');
              }}
              size={'input-xl'}
              bdrs={'1000px'}
            >
              <SquarePen />
            </ActionIcon>
          </Group>
        </>
      )}
    </SideBarTaber.Panel>
  );
};
