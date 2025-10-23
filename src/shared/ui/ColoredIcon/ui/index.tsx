import { useMantineTheme } from '@mantine/core';
import type { IconType } from 'react-icons/lib';

export const ColoredIcons = ({ Icon, c }: { Icon: IconType; c?: string }) => {
  const t = useMantineTheme();
  return <Icon color={c ?? t.colors.gray[6]} />;
};
