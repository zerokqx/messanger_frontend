import { useMantineTheme } from '@mantine/core';
import type { IconType } from 'react-icons/lib';

export const ColoredIcons = ({
  Icon,
  c,
  accent,
}: {
  Icon: IconType;
  c?: string;
  accent?: boolean;
}) => {
  const t = useMantineTheme();

  // Приоритет: accent > c > дефолтный цвет
  const color = accent ? t.colors.blue[8] : (c ?? t.colors.gray[6]);

  return <Icon color={color} />;
};
