import { Grid } from '@mantine/core';
import type { SessionComponent } from '../Session.types';

export const Header: SessionComponent['Header'] = ({ children }) => {
  // const session = useSessionContext();
  return (
    <Grid.Col order={1} span={12}>
      {children}
    </Grid.Col>
  );
};
