import { Stack, Group, Skeleton, Box } from '@mantine/core';

export const SearchSkeleton = () => {
  return (
    <Stack p="sm" gap="md">
      <Stack gap="sm">
        {Array.from({ length: 4 }).map((_, i) => (
          <Group key={i} wrap="nowrap">
            <Skeleton height={40} width={40} radius="xl" />
            <Box style={{ flex: 1 }}>
              <Skeleton height={12} width="40%" radius="xl" mb={6} />
              <Skeleton height={10} width="25%" radius="xl" />
            </Box>
          </Group>
        ))}
      </Stack>
    </Stack>
  );
};
