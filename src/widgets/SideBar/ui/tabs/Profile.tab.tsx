import { ProfileDataDisplay } from '@/entities/user';
import { Button, Center, Space, type ButtonProps } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { sidebarTab } from '../../model/tab';

export const Profile = () => {
  const { t } = useTranslation('sideBar');
  const [Taber, useStore] = sidebarTab;
  const set = useStore.useSetCurrentTab();
  const MotionButton = motion.create<ButtonProps>(Button);
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
          {t('change_profile')}
        </MotionButton>
      </Center>
    </Taber.Panel>
  );
};
