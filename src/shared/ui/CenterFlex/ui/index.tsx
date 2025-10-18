import { Flex, type FlexProps } from '@mantine/core';

export const CenterFlex = ({ ...props }: FlexProps) => {
  return <Flex h={'100vh'} w={"100wh"} justify={'center'} align={'center'} {...props} />;
};
