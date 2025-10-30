import { Flex, Text, useMantineTheme } from '@mantine/core';
import type { DescriptionProp } from '../types/description.type';

export const Description = ({ desc, children, ...props }: DescriptionProp) => {
  const t = useMantineTheme();
  return (
    <Flex direction={'column'} gap={'xs'} {...props}>
      {children}
      <Text fw={100} c={'dark'}>{desc}</Text>
    </Flex>
  );
};
