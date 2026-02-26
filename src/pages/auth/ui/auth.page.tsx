import { Suspense, lazy } from 'react';
import {
  Blockquote,
  Title,
  Space,
  Text,
  Stack,
  Button,
  Group,
  Center,
  useModalsStack,
  Modal,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '@/shared/lib/hooks/use-responsive';

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
  const stack = useModalsStack(['login', 'register']);
  const { mobile } = useResponsive();

  return (
    <>
      <Modal.Stack>
        <Suspense fallback={null}>
          <LoginModalLazy
            title={t('auth:enter')}
            fullScreen={mobile}
            centered
            {...stack.register('login')}
          >
            <Center>
              <Stack align="center">
                <Button
                  variant="transparent"
                  onClick={() => {
                    stack.open('register');
                  }}
                >
                  {t('button-labels:register')}
                </Button>
              </Stack>
            </Center>
          </LoginModalLazy>
          <RegisterModalLazy
            fullScreen={mobile}
            title={t('auth:register')}
            centered
            {...stack.register('register')}
          >
            <Center mt={'md'}>
              <Stack gap={'0'} align="center">
                <Text>{t('auth:have_account')}</Text>
                <Button
                  variant="transparent"
                  onClick={() => {
                    stack.open('login');
                  }}
                >
                  {t('button-labels:enter')}
                </Button>
              </Stack>
            </Center>
          </RegisterModalLazy>
        </Suspense>
      </Modal.Stack>

      <Stack  align={'center'}>
        <Blockquote
          display={'flex'}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Title fw={{ base: 300, sm: 500 }}>
            {t('auth:return_to_yobble')}
          </Title>
          <Text>{t('auth:glad_see_you')}</Text>
          <Text>{t('auth:enter_to_account_for_communicate_friend')}</Text>
          <Space h={'xl'} />
          <Group gap={'md'} justify={'space-around'} wrap='wrap-reverse'>
            <Button
              onClick={() => {
                stack.open('login');
              }}
              bdrs={'xl'}
            >
              {t('button-labels:enter')}
            </Button>
            <Button
              onClick={() => {
                stack.open('register');
              }}
              variant="subtle"
              bdrs={'xl'}
            >
              {t('button-labels:register')}
            </Button>
          </Group>
        </Blockquote>
      </Stack>
    </>
  );
}
