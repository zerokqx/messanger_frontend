import { Box, CloseButton, Group } from '@mantine/core';
import { HeaderMenu } from './HeaderMenu';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';

export const AsideHaeader = () => {
  const update = useLayoutStore((s) => s.update);
  return (
    <Group justify="space-between">
      <Box>
        <CloseButton
          onClick={() => {
            update((s) => (s.asside = false));
          }}
        />
      </Box>
      <Box>
        <HeaderMenu />
      </Box>
    </Group>
  );
};
