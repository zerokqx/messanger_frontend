import { useMantineTheme } from '@mantine/core';
import type { IconType } from 'react-icons/lib';

export const ColoredIcons = ({ Icon }: { Icon: IconType }) => {
  const t = useMantineTheme();
  return <Icon color={t.colors.blue[8]} />;
};
