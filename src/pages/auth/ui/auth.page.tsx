import { Suspense, lazy } from 'react';
import { useModalGlobal } from '@/shared/model/use-modal-store';
import {
  Blockquote,
  Title,
  Space,
  Text,
  Stack,
  Button,
  Group,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

const LoginModalLazy = lazy(() =>
  import('@/features/login').then((m) => ({ default: m.LoginModal }))
);

const RegisterModalLazy = lazy(() =>
  import('@/features/register').then((m) => ({
    default: m.RegisterModal,
  }))
);

export function AuhtPage() {
  const { t } = useTranslation(['auth', 'button-labels']);
  const openLogin = useModalGlobal.usePinOpen()('login');
  const openRegister = useModalGlobal.usePinOpen()('register');

  return (
    <>
      <Suspense fallback={null}>
        <LoginModalLazy whatClose="register" />
        <RegisterModalLazy />
      </Suspense>

      <Stack style={{ zIndex: 2 }} align={'center'}>
        <Blockquote h={{ base: '100vh', xs: 'auto' }}>
          <Title fw={{ base: 300, sm: 500 }}>
            {t('auth:return_to_yobble')}
          </Title>
          <Text>{t('auth:glad_see_you')}</Text>
          <Text>{t('auth:enter_to_account_for_communicate_friend')}</Text>
          <Space h={'xl'} />
          <Group gap={'md'} justify={'space-around'}>
            <Button onClick={openLogin} bdrs={'xl'}>
              {t('button-labels:enter')}
            </Button>
            <Button onClick={openRegister} variant="subtle" bdrs={'xl'}>
              {t('button-labels:register')}
            </Button>
          </Group>
        </Blockquote>
      </Stack>
    </>
  );
}
