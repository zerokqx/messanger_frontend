import { Flex } from '@mantine/core';
import type { DescriptionProp } from '../types/description.type';
import { DescText } from './DescText';

export const Description = ({ desc, children, ...props }: DescriptionProp) => {
  return (
    <Flex direction={'column'} gap={'xs'} {...props}>
      {children}
      <DescText>{desc}</DescText>
    </Flex>
  );
};
