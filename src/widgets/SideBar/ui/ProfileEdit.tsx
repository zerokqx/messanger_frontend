import { ProfileDataDisplay } from '@/entities/user';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Space } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { sidebarTab } from '../model/tab';

export const ProfileEdit = () => {
  const [Taber] = sidebarTab;
  return (
    <Taber.Panel value="profile">
      <ProfileDataDisplay />

      <Space h={'1rem'} />
      <CustomMantineButton w={'100%'} bdrs="xl" variant="gradient">
        <SquarePen />
        <Space w={'1rem'} />
        Изменить профиль
      </CustomMantineButton>
    </Taber.Panel>
  );
};
