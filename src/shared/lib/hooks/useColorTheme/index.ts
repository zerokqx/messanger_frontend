import {
  useMantineTheme,
  type DefaultMantineColor,
  type MantineColorsTuple,
} from '@mantine/core';

export const useColorTheme = (
  colorName: DefaultMantineColor,
  index: keyof MantineColorsTuple
) => {
  const theme = useMantineTheme();
  const palette = theme.colors[colorName];

  return palette ? palette[index] : undefined;
};
