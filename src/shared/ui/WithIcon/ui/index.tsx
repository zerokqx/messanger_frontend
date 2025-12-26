import { Grid, ThemeIcon } from '@mantine/core';
import type { WithIconProp } from '../types';
export const WithIcon = ({
  children,
  icon,
  themeIconProps,
  iconSpan = 'content',
  ...props
}: WithIconProp) => {
  return (
    <Grid align="center" gutter={'xl'} justify="space-between" {...props}>
      <Grid.Col span={iconSpan}>
        <ThemeIcon {...themeIconProps}>{icon}</ThemeIcon>
      </Grid.Col>
      <Grid.Col span={'auto'}>{children}</Grid.Col>
    </Grid>
  );
};
