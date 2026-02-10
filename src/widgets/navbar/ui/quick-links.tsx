import {
  ActionIcon,
  Group,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import type { ReactNode } from 'react';

export interface QuickLink {
  label: string;
  icon: ReactNode;
  value: string;
}
interface QuickLinksProps {
  onClickLink?: (v: string) => void;
  motionDivProps?: MotionProps;
  links: QuickLink[];
  activeValue?: string;
}

export const QuickLinks = ({
  activeValue,
  motionDivProps,
  onClickLink,
  links,
}: QuickLinksProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Group
      bg={colorScheme === 'dark' ? 'dark' : 'gray.1'}
      p={'xs'}
      justify="space-evenly"
    >
      {links.map((t) => {
        const active = activeValue === t.value;
        return (
          <ActionIcon
            key={t.value}
            variant={active ? 'filled' : 'light'}
            color={active ? 'blue' : 'gray'}
            radius="xl"
            size="lg"
            onClick={() => {
              onClickLink?.(t.value);
            }}
          >
            {t.icon}
          </ActionIcon>
        );
      })}
    </Group>
  );
};
