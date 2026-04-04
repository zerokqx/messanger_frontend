import { Center, Loader } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const AppBootLoader = () => {
  const [t] = useTranslation('titles');
  return (
    <Center style={{
      zIndex:10000
    }} pos={'absolute'} h="100dvh" w="100%" role="status" aria-label={t('loading')}>
      <Loader />
    </Center>
  );
};
