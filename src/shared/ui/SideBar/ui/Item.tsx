import { Badge, Grid, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { motion } from 'motion/react';
import { If, Then } from 'react-if';
import type { SideItemProps } from '../types/item.type';
import { useId, useMemo } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { hover } from '@/shared/styles/HoverOpacity.css';
export const SideItem = ({
  children,
  text,
  inDev,
  onClick,
  ...props
}: SideItemProps) => {
  const id = useId();
  const watches = useMediaQuery('(max-width: 250px)');

  const MotionGridCol = useMemo(() => motion.create(Grid.Col), []);
  return (
    <Grid
      key={id}
      align="center"
      {...props}
      onClick={onClick}
      bdrs={'xl'}
      className={hover}
    >
      {!watches && (
        <MotionGridCol span={'content'}>
          <ThemeIcon size={'xl'} autoContrast>
            {children}
          </ThemeIcon>
        </MotionGridCol>
      )}
      <Grid.Col span={'auto'}>
        <Text>{text}</Text>
      </Grid.Col>
      <If condition={inDev && !watches}>
        <Then>
          {(() => {
            return (
              <MotionGridCol
                pr={'md'}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                animate={{
                  y: [0, 2, 0],
                }}
                span={'content'}
              >
                <Badge>В разработке</Badge>
              </MotionGridCol>
            );
          })()}
        </Then>
      </If>
    </Grid>
  );
};
