import { UserProfile } from '@/entities/user';
import { ActionIcon, Button, Center, Group, Space } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SideBarTaber, useTabSidebar } from '../../model/tab';
import { useMe } from '@/entities/user/model/me.query';

export const Profile = () => {
  const set = useTabSidebar.useSetCurrentTab();

  const { data: user } = useMe();

  return (
    <SideBarTaber.Panel value="profile">
      {user && (
        <>
          <UserProfile profile={user} />
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
