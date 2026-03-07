import { Divider, Grid, Stack } from '@mantine/core';
import type { SessionComponent } from '../session.types';

export const Footer: SessionComponent['Footer'] = ({
  withDivider,
  dividerProps,
  children,
}) => {
  return (
    <Grid.Col span={12} order={3}>
      <Stack>
        {withDivider && children && <Divider  {...dividerProps} />}
        {children}
      </Stack>
    </Grid.Col>
  );
};
