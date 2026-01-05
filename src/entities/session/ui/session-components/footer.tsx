import { Grid } from '@mantine/core';
import type { SessionComponent } from '../Session.types';

export const Footer: SessionComponent['Footer'] = ({ children }) => {
  return (
    <Grid.Col span={12} order={3}>
      {children}
    </Grid.Col>
  );
};
