import { Box, Center, useMantineTheme } from '@mantine/core';

export const Separator = () => {
  const t = useMantineTheme();
  return (
    <Center>
      <Box w={'100%'} h={'1px'} bg={t.colors.gray[9]} />
    </Center>
  );
};
