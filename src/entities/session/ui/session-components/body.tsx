import { Divider, Grid, Stack } from '@mantine/core';
import type { SessionComponent } from '../session.types';
import { lightDark } from '@/shared/lib/light-dark';

export const Body: SessionComponent['Body'] = ({
  withDivider,
  dividerProps,
  children,
}) => {
  return (
    <Grid.Col span={12} order={2}>
      <Stack gap="xs" mt="xs">
        {withDivider && (
          <Divider
            color={lightDark('gray.2', 'dark.4')}
            labelPosition="center"
            {...dividerProps}
          />
        )}
        {children}
      </Stack>
    </Grid.Col>
  );
};
