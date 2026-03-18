import { Box, Skeleton, Stack } from '@mantine/core';

export const MessageSkeleton = () => {
  return (
    <Box
      px="md"
      py="sm"
      style={{
        maxWidth: 520,
      }}
    >
      <Stack
        gap={6}
        p="sm"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 8,
        }}
      >
        <Skeleton height={14} width="60%" radius="xl" />

        <Skeleton height={12} width="90%" radius="xl" />

        <Skeleton height={12} width="70%" radius="xl" />

        <Skeleton height={12} width="50%" radius="xl" />

        <Skeleton height={12} width="80%" radius="xl" />
      </Stack>
    </Box>
  );
};
