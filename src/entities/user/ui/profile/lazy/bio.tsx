import { useNotifyClipboard } from '@/shared/lib/hooks/useNotifyClipboard';
import { Blockquote, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LazyBio = ({ bio }: { bio: string }) => {
  const [t] = useTranslation('profile');
  const copy = useNotifyClipboard();
  const firstChar = bio.charAt(0);
  const newBio = bio.slice(1);

  return (
    <Blockquote
      onMouseUp={() => {
        copy(bio,t('bio'));
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
          <Text span c={'blue'} fw={'bold'}>
            {firstChar}
          </Text>
          {newBio}
        </Text>
      }
    </Blockquote>
  );
};
