import { Center, Loader } from '@mantine/core';

export const AppBootLoader = () => {
  return (
    <Center style={{
      zIndex:10000
    }} pos={'absolute'} h="100dvh" w="100%" role="status" aria-label="Application loading">
      Idawdaw
      <Loader />
    </Center>
  );
};
