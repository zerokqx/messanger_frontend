import { Grid, Stack } from '@mantine/core';
import type { SessionComponent } from '../Session.types';

export const Body: SessionComponent['Body'] = ({ children }) => {
  return (
    <Grid.Col span={12} order={2}>
      <Stack gap={'xs'}>{children}</Stack>
    </Grid.Col>
  );
};
