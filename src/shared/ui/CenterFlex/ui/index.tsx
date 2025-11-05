import { Flex, type FlexProps } from '@mantine/core';
import type { RefObject } from 'react';

export const CenterFlex = ({
  ref,
  ...props
}: FlexProps & { ref: RefObject<HTMLDivElement> }) => {
  return (
    <Flex
      ref={ref}
      h={'100vh'}
      w={'100%'}
      justify={'center'}
      align={'center'}
      {...props}
    />
  );
};
