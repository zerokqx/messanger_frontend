import { Suspense, lazy } from 'react';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import {
  Flex,
  Blockquote,
  Title,
  Space,
  Text,
  Stack,
  Button,
  Group,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Search } from '@/shared/ui/Search';

const LoginModalLazy = lazy(() =>
  import('@/widgets/LoginModal').then((m) => ({ default: m.LoginModal }))
);

const RegisterModalLazy = lazy(() =>
  import('@/widgets/RegisterModal/ui/RegisterModal').then((m) => ({
    default: m.RegisterModal,
  }))
);

export function AuhtPage() {
  const { t } = useTranslation(['titles', 'buttonLabels', 'texts']);
  const openLogin = useModalGlobal.usePinOpen()('login');
  const openRegister = useModalGlobal.usePinOpen()('register');

  return (
    <>
      <Suspense fallback={null}>
        <LoginModalLazy />
        <RegisterModalLazy />
      </Suspense>

      <Stack style={{ zIndex: 2 }} align={'center'}>
        <Blockquote h={{ base: '100vh', xs: 'auto' }}>
          <Title fw={{ base: 300, sm: 500 }} c={'blue'}>
            {t('titles:return_to_yobble')}
          </Title>
          <Text>{t('texts:glad_see_you')}</Text>
          <Text>{t('texts:enter_to_account_for_communicate_friend')}</Text>
          <Space h={'xl'} />
          <Group gap={'md'} justify={'space-around'}>
            <Button onClick={openLogin} bdrs={'xl'}>
              {t('buttonLabels:enter')}
            </Button>
            <Button onClick={openRegister} variant="subtle" bdrs={'xl'}>
              {t('buttonLabels:register')}
            </Button>
          </Group>
        </Blockquote>
      </Stack>
    </>
  );
}
