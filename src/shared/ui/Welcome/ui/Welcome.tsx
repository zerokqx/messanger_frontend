import { Blockquote, Flex, Title } from '@mantine/core';
import { CustomMantineButton } from '../../Button';
import { useLoginModal } from '@/widgets/LoginModal';
import { useRegisterModal } from '@/widgets/RegisterModal/model/useRegisterModal';
// WARN: Not correct architecture fsd.
export default function Welcome({ children }: { children: string }) {
  const login = useLoginModal()
  const register = useRegisterModal()
  return (
    <Flex direction={'column'} gap={'md'} justify={'start'}>
      <Title c="white" textWrap="balance" order={1}>
        {children}
      </Title>

      <Blockquote cite="– Yobble Team" color="white">
        Общайся легко и удобно — всё самое важное всегда под рукой
      </Blockquote>
      <Flex justify={"space-between"} align={'center'}>


      <CustomMantineButton

        onClick={() => {
          login.toggle()
        }}
      >
       Войти 
      </CustomMantineButton>
      <CustomMantineButton

        onClick={() => {
          register.toggle()
        }}
      >
       Зарегистрироваться 
      </CustomMantineButton>
      </Flex>
    </Flex>
  );
}
