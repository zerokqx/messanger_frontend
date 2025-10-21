import { useModalGlobal } from '@/shared/model/useModalStore';
import { CustomMantineButton } from '@/shared/ui/Button';
import { Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { KeyRound } from 'lucide-react';
import { useEffectOnce } from 'react-use';
export const LoginBadge = () => {
  const login = useModalGlobal((s) => s.pinOpen)('login');
  const register = useModalGlobal((s) => s.pinOpen)('register');
  useEffectOnce(() => {
    notifications.show({
      icon: <KeyRound size={16} />,
      id: 'login',
      message: (
        <>
          <Flex gap={'md'}>
            <CustomMantineButton
              bdrs={'xl'}
              variant="subtle"
              onClick={register}
            >
              Зарегистрироваться
            </CustomMantineButton>
            <CustomMantineButton bdrs="xl" onClick={login}>
              Войти
            </CustomMantineButton>
          </Flex>
        </>
      ),
    });
  });
  return null;
};
