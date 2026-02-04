import { Divider, Grid, Stack } from '@mantine/core';
import type { SessionComponent } from '../session.types';

export const Body: SessionComponent['Body'] = ({
  withDivider,
  dividerProps,
  children,
}) => {
  return (
    <Grid.Col span={12} order={2}>
      <Stack gap={'xs'}>
        {withDivider && <Divider color="dark" {...dividerProps} />}
        {children}
      </Stack>
    </Grid.Col>
  );
};
