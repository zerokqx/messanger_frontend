import { useMantineTheme } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';

export const ColoredIcons = ({
  Icon,
  c,
  accent,
}: {
  Icon: LucideIcon;
  c?: string;
  accent?: boolean;
}) => {
  const t = useMantineTheme();

  const color = accent ? t.colors.blue[8] : (c ?? t.colors.gray[6]);

  return <Icon color={color} />;
};
