import { Text } from '@mantine/core';
import { useProfileContext } from '../../model/profile-context';
import type { IUserProfile } from './types/user-profile.types';
import { IconButton } from '@/shared/ui/buttons';
import { Label, LabelBox } from '@/shared/ui/lables';
import { useTranslation } from 'react-i18next';
import { useNotifyClipboard } from '@/shared/lib/hooks/use-notify-clipboard';

export const Login: IUserProfile['Login'] = () => {
  const copy = useNotifyClipboard();
  const { login } = useProfileContext();
  const [t] = useTranslation('profile');

  return (
    login && (
      <IconButton
        onMouseUp={() => {
          copy(login, t('login'));
        }}
      >
        <LabelBox>
          <Text>{login}</Text>
          <Label>{t('login')}</Label>
        </LabelBox>
      </IconButton>
    )
  );
};
