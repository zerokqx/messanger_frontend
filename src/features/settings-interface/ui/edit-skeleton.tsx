import { Box, Group, Skeleton, Stack } from '@mantine/core';

export const InterfaceEditSkeleton = () => {
  return (
    <Stack gap="md" p="xs">
      <Stack gap={6}>
        <Skeleton height={14} width={140} radius="sm" />
        <Skeleton height={40} radius="md" />
      </Stack>

      <Stack gap={6}>
        <Skeleton height={14} width={190} radius="sm" />
        <Skeleton height={40} radius="md" />
      </Stack>

      <Group justify="space-between" align="flex-start" mt={4}>
        <Group gap="sm" align="flex-start" wrap="nowrap">
          <Skeleton height={22} width={44} radius="xl" mt={2} />

          <Stack gap={6}>
            <Skeleton height={14} width={130} radius="sm" />
            <Skeleton height={10} width={260} radius="sm" />
            <Skeleton height={10} width={220} radius="sm" />
          </Stack>
        </Group>
      </Group>

      <Group justify="space-between" align="center" mt={6}>
        <Group gap="sm" align="center" wrap="nowrap">
          <Skeleton height={22} width={22} radius="md" />
          <Skeleton height={14} width={90} radius="sm" />
        </Group>
        <Skeleton height={22} width={44} radius="xl" />
      </Group>

      <Box mt={8}>
        <Stack gap={10}>
          <Skeleton height={12} width="60%" radius="sm" />
          <Skeleton height={12} width="45%" radius="sm" />
        </Stack>
      </Box>
    </Stack>
  );
};
