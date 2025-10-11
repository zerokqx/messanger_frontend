import { Flex, Text } from '@mantine/core';
import styles from '../hover/SideItem.module.css';
import type { SideItemProps } from '../types/item.type';
export const SideItem = ({ children, text }: SideItemProps) => {
  return (
    <Flex
      className={styles.hoverItem}
      w={'100%'}
      gap={'md'}
      p={'xs'}
      justify={'start'}
      align={'center'}
      h={'2rem'}
      styles={{
        root: {
          cursor: 'pointer',
        },
      }}
    >
      {children}
      <Text>{text}</Text>
    </Flex>
  );
};
