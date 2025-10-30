import { Badge, Flex, Space, Text, useMantineTheme } from '@mantine/core';
import { useAnimate } from 'motion/react';
import { useEffectOnce } from 'react-use';
import type { SideItemProps } from '../types/item.type';
import { useId } from '@mantine/hooks';
import { useSelected } from '../store/useSelected';
import { useBorder } from '@/widgets/Settings';
export const SideItem = ({
  children,
  text,
  inDev,
  onClick,
  ...props
}: SideItemProps) => {
  const bd = useBorder('0.1rem');
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const id = useId();
  const { setSelected, id: selected } = useSelected();
  const t = useMantineTheme();
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
      onClick={(e) => {
        setSelected(id);
        onClick?.(e);
      }}
      p={'md'}
      bg={selected === id ? t.colors.dark[9] : 'none'}
      h={'3rem'}
      direction={'column'}
      mt={'md'}
      bd={bd}
      bdrs={'xl'}
      justify={'center'}
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
      <Flex justify={'start'} gap={'md'} direction={'row'}>
        {children}
        <Text>{text}</Text>
        {inDev && (
          <>
            <Space style={{ flexGrow: 1 }} />
            <Badge ref={scope}>В разработке</Badge>
          </>
        )}
      </Flex>
    </Flex>
  );
};
