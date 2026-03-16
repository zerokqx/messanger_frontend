import type { MantineColor } from '@mantine/core';

type Color = MantineColor | `${MantineColor}.${number}`;

const toMantineVar = (color: Color): string => {
  const [name, shade] = color.split('.');

  if (!name) {
    return '';
  }

  if (shade !== '') {
    return `var(--mantine-color-${name}-${shade})`;
  }

  return `var(--mantine-color-${name})`;
};

export const lightDark = (lightColor: Color, darkColor: Color): string => {
  return `light-dark(${toMantineVar(lightColor)}, ${toMantineVar(darkColor)})`;
};
