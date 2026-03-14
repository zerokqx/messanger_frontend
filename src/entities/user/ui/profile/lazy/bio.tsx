import { useNotifyClipboard } from '@/shared/lib/hooks/use-notify-clipboard';
import { Blockquote, Skeleton, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LazyBio = ({ bio }: { bio: string }) => {
  const [t] = useTranslation('profile');
  const copy = useNotifyClipboard();

  return (
    <Blockquote
      onMouseUp={() => {
        copy(bio, t('bio'));
      }}
      bdrs={'sm'}
    >
      {bio}
    </Blockquote>
  );
};
export const BioSkeleton = () => {
  return <Skeleton animate w={'100%'} h={100} />;
};
