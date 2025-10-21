import { useModalGlobal } from '@/shared/model/useModalStore';
import { Blockquote, Flex, Title } from '@mantine/core';
import { CustomMantineButton } from '../../Button';
// WARN: Not correct architecture fsd.
export const Welcome = ({ children }: { children: string }) => {
  const login = useModalGlobal((s) => s.pinOpen)('login');

  const register = useModalGlobal((s) => s.pinOpen)('register');
  return (
    <Flex direction={'column'} gap={'md'} justify={'start'}>
      <Title c="white" textWrap="balance" order={1}>
        {children}
      </Title>

      <Blockquote cite="– Yobble Team" color="white">
        Общайся легко и удобно — всё самое важное всегда под рукой
      </Blockquote>
      <Flex justify={'space-between'} align={'center'}>
        <CustomMantineButton onClick={login}>Войти</CustomMantineButton>
        <CustomMantineButton onClick={register}>
          Зарегистрироваться
        </CustomMantineButton>
      </Flex>
    </Flex>
  );
};
