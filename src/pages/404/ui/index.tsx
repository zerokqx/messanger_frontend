import {
  AppShell,
  AppShellMain,
  Center,
  Divider,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const NotFoundError = () => {
  const { t } = useTranslation(['titles']);
  return (
    <>
      <AppShell padding={'md'} disabled>
        <AppShellMain>
          <Center h={'100vh'}>
            <Stack gap={'0'} justify="center">
              <Title c="white">404</Title>
              <Title>{t('titles:not_found_page')}</Title>
              <Divider />
              <Space h={'1rem'} />
              <Text>{t('titles:please_check_address')}</Text>
            </Stack>
          </Center>
        </AppShellMain>
      </AppShell>
    </>
  );
};
