import { ProfileDataDisplay } from '@/entities/user';
import { Button, Center, Space, type ButtonProps } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SideBarTaber, useTabSidebar } from '../../model/tab';
import { useAuth } from '@/shared/model/authProviderContext';

export const Profile = () => {
  const { t } = useTranslation('sideBar');
  const set = useTabSidebar.useSetCurrentTab();
  const login = useAuth((s) => s.user.login) || 'Anonymous';

  const fullName = useAuth((s) => s.user.full_name ?? '');
  const bio = useAuth((s) => s.user.bio ?? 'Anonymous');
  const rating = useAuth((s) => s.user.rating.rating ?? 0);
  const MotionButton = motion.create<ButtonProps>(Button);
  return (
    <SideBarTaber.Panel value="profile">
      <ProfileDataDisplay {...{ bio, login, fullName, rating }} />
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
    </SideBarTaber.Panel>
  );
};
