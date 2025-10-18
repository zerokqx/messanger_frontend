import { Flex, Text } from '@mantine/core';
import type { SideItemProps } from '../types/item.type';
import { Separator } from '../../Separator';
export const SideItem = ({ children, text, ...props }: SideItemProps) => {
  return (
    <Flex
      {...props}
      gap={'md'}
      p={'md'}
      h={'3rem'}
      direction={'column'}
      mt={'md'}
      styles={{
        root: {
          position: 'relative',
          cursor: 'pointer',
        },
      }}
    >
      <Flex
        align={'center'}
        gap={'md'}
        direction={'row'}
        styles={{
          root: {
            cursor: 'pointer',
          },
        }}
      >
        {children}
        <Text>{text}</Text>
      </Flex>
      <Separator />
    </Flex>
  );
};
