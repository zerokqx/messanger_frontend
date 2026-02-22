import React from 'react';
import { Box, Group, Skeleton, Stack, Text } from '@mantine/core';

export function PrivacySettingsSkeleton() {
  return (
    <Box p="md">
      {/* Title */}
      <Skeleton height={28} width={260} radius="md" mb="md" />

      {/* Checkbox list */}
      <Stack gap="sm" mb="lg">
        {Array.from({ length: 7 }).map((_, i) => (
          <Group key={i} gap="sm" align="center" wrap="nowrap">
            <Skeleton height={20} width={20} radius={6} />
            <Skeleton height={14} width={`${55 + (i % 3) * 12}%`} radius="sm" />
          </Group>
        ))}

        {/* One unchecked option (as in screenshot) */}
        <Group gap="sm" align="center" wrap="nowrap">
          <Skeleton height={20} width={20} radius={6} />
          <Skeleton height={14} width="62%" radius="sm" />
        </Group>
      </Stack>

      {/* Select blocks */}
      <Stack gap="lg">
        <SelectBlockSkeleton labelWidth={190} />
        <SelectBlockSkeleton labelWidth={210} />
        <SelectBlockSkeleton labelWidth={180} />
        <SelectBlockSkeleton labelWidth={130} />
        <SelectBlockSkeleton labelWidth={210} />
        <SelectBlockSkeleton labelWidth={240} />
      </Stack>
    </Box>
  );
}

export function SelectBlockSkeleton({
  labelWidth = 200,
}: {
  labelWidth?: number;
}) {
  return (
    <Box>
      <Group gap="sm" mb={8} align="center">
        <Skeleton height={14} width={labelWidth} radius="sm" />
      </Group>

      {/* Select input */}
      <Group justify="space-between" align="center" wrap="nowrap">
        <Skeleton height={40} width="100%" radius="md" />
        {/* caret / dropdown icon placeholder */}
        <Skeleton height={18} width={18} radius="sm" ml={-34} />
      </Group>

      {/* Fake selected value line inside select */}
      <Box mt={-30} ml={12} style={{ pointerEvents: 'none' }}>
        <Text size="sm" c="dimmed">
          <Skeleton height={12} width={60} radius="sm" />
        </Text>
      </Box>
    </Box>
  );
}
