import { Grid } from '@mantine/core';
import type { SessionComponent } from '../session.types';

export const Header: SessionComponent['Header'] = ({ children }) => {
  return (
    <Grid.Col order={1} span={12}>
      {children}
    </Grid.Col>
  );
};
