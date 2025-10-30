import { sidebarTab } from '../model/tab';
import { Form } from '@/shared/ui/Form';
import { formOptions } from '@tanstack/react-form';
import { ProfileDataDisplay, useUserStore } from '@/entities/user';
import { CustomMantineButton } from '@/shared/ui/Button';
import { SquarePen } from 'lucide-react';
import { Space } from '@mantine/core';

export const ProfileEdit = () => {
  const [Taber, , , Buttons] = sidebarTab;
  const login = useUserStore.use.login();
  const opt = formOptions({
    defaultValues: {
      login,
    },
  });
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
