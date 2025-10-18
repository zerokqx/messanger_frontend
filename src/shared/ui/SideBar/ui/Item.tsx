import { Flex, Text, useMantineTheme } from '@mantine/core';
import type { SideItemProps } from '../types/item.type';
import { hoverOpacity } from '@/shared/styles/HoverOpacity.css';
export const SideItem = ({ children, text, ...props }: SideItemProps) => {
  const t = useMantineTheme();
  return (
    <Flex
      {...props}
      gap={'md'}
      p={'md'}
      align={'center'}
      h={'3rem'}
      styles={{
        root: {
          position: 'relative',
          cursor: 'pointer',
        },
      }}
    >
      <div className={hoverOpacity} />
      {children}
      <Text>{text}</Text>
    </Flex>
  );
};
