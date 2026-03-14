import { Divider, Grid, Stack } from '@mantine/core';
import type { SessionComponent } from '../session.types';
import { lightDark } from '@/shared/lib/light-dark';

export const Footer: SessionComponent['Footer'] = ({
  withDivider,
  dividerProps,
  children,
}) => {
  return (
    <Grid.Col span={12} order={3}>
      <Stack mt="xs" gap="xs">
        {withDivider && children && (
          <Divider color={lightDark('gray.2', 'dark.4')} {...dividerProps} />
        )}
        {children}
      </Stack>
    </Grid.Col>
  );
};
