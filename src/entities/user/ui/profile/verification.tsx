import { IconButton } from '@/shared/ui/buttons';
import { useProfileContext } from '../../model/current-user-profile-context';
import type { IUserProfile } from './types';
import { useTranslation } from 'react-i18next';
import { BadgeCheck } from 'lucide-react';
import { ThemeIcon } from '@mantine/core';

export const Verification: IUserProfile['Verification'] = () => {
  const { is_verified } = useProfileContext();
  const [t] = useTranslation('profile');
  return (
    is_verified && (
      <IconButton
        rightSection={
          <ThemeIcon>
            <BadgeCheck />
          </ThemeIcon>
        }
      >
        {t('verified')}
      </IconButton>
    )
  );
};
