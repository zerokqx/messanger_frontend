import { Grid, ThemeIcon, useMatches } from '@mantine/core';
import type { WithIconProp } from '../types';
import { withIconStyles } from '../styles/index.css';
import { backgound } from '../../Button/ui/button.css';
export const WithIcon = ({
  children,
  icon,
  themeIconProps,
  iconSpan = 'content',
  ...props
}: WithIconProp) => {
  return (
    <Grid align="center" gutter={'xl'} justify="start" {...props}>
      <Grid.Col span={iconSpan}>
        <ThemeIcon {...themeIconProps}>{icon}</ThemeIcon>
      </Grid.Col>
      <Grid.Col span={'content'}>{children}</Grid.Col>
    </Grid>
  );
};
