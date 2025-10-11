import { Avatar, Flex, Text } from '@mantine/core';
import { useUserStore } from '../model/userStore';

export const UserBadge = () => {
  const { login, ...p } = useUserStore();
  console.log(p);
  return (
    <Flex
      align={'end'}
      bg={'dark'}
      justify={'center'}
      gap={'xl'}
      w="max-content"
      p={'sm'}
      bdrs={'xl'}
    >
      <Avatar
        variant="gradient"
        color="blue"
        alt={login + ' avatar'}
        name={login}
      />
      <Text>{login}</Text>
    </Flex>
  );
};
