import { Avatar, Flex, Text } from '@mantine/core';
import { useUserStore } from '../model/userStore';

export const UserBadge = () => {
  const { login, ...p } = useUserStore();
  console.log(p);
  return (
    <Flex
      align={'start'}
      justify={'start'}
      gap={'md'}
      direction={'column'}
      p={'sm'}
      bdrs={'xl'}
    >
      <Avatar
        variant="white"
        color="indigo"
        alt={login + ' avatar'}
        name={login}
      />
      <Text c="white" fw={700}>
        {login}
      </Text>
    </Flex>
  );
};
