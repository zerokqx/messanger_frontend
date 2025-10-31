import { Grid, ThemeIcon } from '@mantine/core';
import type { WithIconProp } from '../types';

export const WithIcon = ({
  children,
  icon,
  themeIconProps,
  ...props
}: WithIconProp) => {
  return (
    <Grid align="center" gutter={'xl'} justify="start" {...props}>
      <Grid.Col span={0}>
        <ThemeIcon {...themeIconProps}>{icon}</ThemeIcon>
      </Grid.Col>
      <Grid.Col span={0}>{children}</Grid.Col>
    </Grid>
  );
};
