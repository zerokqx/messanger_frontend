import {
  Badge,
  Grid,
  Text,
  ThemeIcon,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import chroma from 'chroma-js';
import { motion } from 'motion/react';
import { If, Then } from 'react-if';
import type { SideItemProps } from '../types/item.type';
import { useId } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useBorder } from '@/widgets/Settings';
export const SideItem = ({
  children,
  text,
  inDev,
  onClick,
  ...props
}: SideItemProps) => {
  const id = useId();
  const watches = useMediaQuery('(max-width: 250px)');
  const t = useMantineTheme();
  const MotionGridCol = motion.create(Grid.Col);
  const MotionGrid = motion.create(Grid);
  return (
    <MotionGrid
      key={id}
      align="center"
      {...props}
      onClick={onClick}
      bdrs={'xl'}
      whileHover={{
        background: chroma(t.white).luminance(0.01).css('hsl'),
      }}
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
                animate={{ y: [null, 2, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                span={'content'}
              >
                <Badge>В разработке</Badge>
              </MotionGridCol>
            );
          })()}
        </Then>
      </If>
    </MotionGrid>
  );
};
