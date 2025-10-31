import { ProfileDataDisplay } from '@/entities/user';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Center, Space } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { sidebarTab } from '../model/tab';
import { motion } from 'motion/react';

export const Profile = () => {
  const [Taber, , useControll] = sidebarTab;
  const { set } = useControll();
  const MotionButton = motion.create(CustomMantineButton);
  return (
    <Taber.Panel value="profile">
      <ProfileDataDisplay />

      <Space h={'1rem'} />
      <Center>
        <MotionButton
          onClick={() => {
            set('profile_edit');
          }}
          initial={{ width: '0%' }}
          whileInView={{ width: '100%' }}
          whileHover={{ width: '90%' }}
        >
          <SquarePen />
          <Space w={'1rem'} />
          Изменить профиль
        </MotionButton>
      </Center>
    </Taber.Panel>
  );
};
