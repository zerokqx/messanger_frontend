import { useCheckAuth } from '@/features/checkAuth';
import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Blockquote, Flex, Space, Text, Title } from '@mantine/core';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  beforeLoad() {
    if (useCheckAuth.check()) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const openLogin = useModalGlobal.usePinOpen()('login');
  const openRegister = useModalGlobal.usePinOpen()('register');
  return (
    <>
      <Flex style={{ zIndex: 2 }} h={'100vh'} w={'100%'} justify={'center'}>
        <Blockquote h={'100vh'}>
          <Title fw={{ base: 300, sm: 500 }} c={'blue'}>
            С возвращением в Yobble!
          </Title>
          <Text>Рады, что вы снова здесь.</Text>
          <Text>Войдите в аккаунт, чтобы снова быть на связи с друзьями</Text>
          <Space h={'xl'} />
          <Flex gap={'md'} w={'100%'} justify={'space-between'}>
            <CustomMantineButton onClick={openLogin} bdrs={'xl'}>
              Войти
            </CustomMantineButton>
            <CustomMantineButton
              onClick={openRegister}
              variant="subtle"
              bdrs={'xl'}
            >
              Зарегистрироваться
            </CustomMantineButton>
          </Flex>
        </Blockquote>
      </Flex>
    </>
  );
}
