import { IconButton } from '@/shared/ui/buttons';
import type { IUserProfile } from './types';
import { useMemo } from 'react';
import { Label, LabelBox } from '@/shared/ui/lables';
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNotifyClipboard } from '@/shared/lib/hooks/use-notify-clipboard';
import { useProfileContext } from '../../model/current-user-profile-context';

export const CreatedAt: IUserProfile['CreatedAt'] = () => {
  const copy = useNotifyClipboard();
  const { created_at } = useProfileContext();
  const [t] = useTranslation('profile');
  const data = useMemo(() => {
    return new Date(created_at ?? '')
      .toLocaleString('ru-RU', {
        timeZone: 'UTC',
      })
      .split(',')[0];
  }, [created_at]);
  return (
    created_at && (
      <IconButton
        onMouseUp={() => {
          copy(data, t('created_at'));
        }}
      >
        <LabelBox>
          <Text>{data}</Text>
          <Label>{t('created_at')}</Label>
        </LabelBox>
      </IconButton>
    )
  );
};
