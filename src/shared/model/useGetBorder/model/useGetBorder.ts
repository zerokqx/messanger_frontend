import { useMantineTheme, type MantineTheme } from '@mantine/core';

type Rem<N extends number> = `${N}rem`;
type Border<T extends number> =
  `${Rem<T>} solid ${MantineTheme['colors']['gray'][9]}`;
export function useGetBorder<T extends number>(size: Rem<T>): Border<T> {
  const t = useMantineTheme();
  return `${size} solid ${t.colors.gray[9]}`;
}
