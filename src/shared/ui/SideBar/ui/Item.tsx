import { Badge, Divider, Flex, Space, Text } from '@mantine/core';
import { useAnimate } from 'motion/react';
import { useEffectOnce } from 'react-use';
import type { SideItemProps } from '../types/item.type';
export const SideItem = ({
  children,
  text,
  inDev,
  ...props
}: SideItemProps) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  useEffectOnce(() => {
    if (!inDev) return;
    const a = animate(
      scope.current,
      {
        y: [0, 2, 0],
      },
      {
        repeat: Infinity,
        repeatType: 'loop',
      }
    );
    return a.stop;
  });
  return (
    <Flex
      {...props}
      gap={'md'}
      p={'md'}
      h={'3rem'}
      direction={'column'}
      mt={'md'}
      style={{
        position: 'relative',
        ...(inDev
          ? {
              cursor: 'not-allowed',
              pointerEvents: 'none',
            }
          : {
              cursor: 'pointer',
            }),
      }}
    >
      <Flex align={'center'} gap={'md'} direction={'row'}>
        {children}
        <Text>{text}</Text>
        {inDev && (
          <>
            <Space style={{ flexGrow: 1 }} />
            <Badge ref={scope}>В разработке</Badge>
          </>
        )}
      </Flex>
      <Divider />
    </Flex>
  );
};
