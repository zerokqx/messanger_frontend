import { Blockquote, Flex, Title } from '@mantine/core';
import { CustomMantineButton } from '../../Button';
import { useNavigate } from '@tanstack/react-router';
export default function Welcome({ children }: { children: string }) {
  const navigate = useNavigate({
    from: '/auth',
  });
  return (
    <Flex direction={'column'} gap={'md'} justify={'start'}>
      <Title c="white" textWrap="balance" order={1}>
        {children}
      </Title>

      <Blockquote cite="– Yobble Team" color="white">
        Общайся легко и удобно — всё самое важное всегда под рукой
      </Blockquote>
      <CustomMantineButton
        onClick={() => {
          throw navigate({
            to: '/auth',
          });
        }}
      >
        Начать
      </CustomMantineButton>
    </Flex>
  );
}
