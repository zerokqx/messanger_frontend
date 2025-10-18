import { Avatar, Flex, Text, useMantineTheme } from '@mantine/core';
import { useUserStore } from '../model/userStore';

export const UserBadge = () => {
  const { login } = useUserStore();
  const t = useMantineTheme();
  return (
    <Flex
      p={'sm'}
      gap={'md'}
      align={'start'}
      justify={'start'}
      direction={'column'}
    >
      <Avatar styles={{
        root:{
          background: t.colors.blue[8]
        }
      }} alt={login + ' avatar'} name={login} />
      <Text c="white" fw={700}>
        {login}
      </Text>
    </Flex>
  );
};
