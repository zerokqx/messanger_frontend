import { useNotifyClipboard } from '@/shared/lib/hooks/use-notify-clipboard';
import { Blockquote, Skeleton, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LazyBio = ({ bio }: { bio: string }) => {
  const [t] = useTranslation('profile');
  const copy = useNotifyClipboard();
  const firstChar = bio.charAt(0);

  return (
    <Blockquote
      onMouseUp={() => {
        copy(bio, t('bio'));
      }}
      bdrs={'sm'}
    >
      {
        <Text
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}
          w={'100%'}
        >
          {bio}
        </Text>
      }
    </Blockquote>
  );
};
export const BioSkeleton = () => {
  return <Skeleton animate w={'100%'} h={100} />;
};
