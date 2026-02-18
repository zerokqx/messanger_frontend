import React from 'react';
import {
  Card,
  Stack,
  Group,
  Skeleton,
  Divider,
  Button,
  Box,
} from '@mantine/core';

interface SessionListSkeletonProps {
  count?: number;
  withCurrentDevice?: boolean;
}

export function SessionListSkeleton({
  count = 4,
  withCurrentDevice = true,
}: SessionListSkeletonProps) {
  const items = Array.from({ length: count });

  return (
    <Stack gap={14}>
      {items.map((_, idx) => {
        const isCurrent = withCurrentDevice && idx === 0;

        return (
          <Card
            key={`id-${idx.toString()}`}
            radius="lg"
            withBorder
            p="md"
            style={{ overflow: 'hidden' }}
          >
            <Stack gap="sm">
              {/* Header row */}
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <Box style={{ flex: 1 }}>
                  <Skeleton height={14} width="70%" radius="xl" mb={8} />
                  <Skeleton height={12} width="45%" radius="xl" />
                </Box>

                {/* Badge: "Это устройство" */}
                {isCurrent ? (
                  <Skeleton height={22} width={110} radius="xl" />
                ) : (
                  <Skeleton height={22} width={0} radius="xl" />
                )}
              </Group>

              <Divider />

              {/* Rows with icons + text */}
              <Group gap="sm" align="center" wrap="nowrap">
                <Skeleton height={18} width={18} radius="sm" />
                <Skeleton height={12} width="55%" radius="xl" />
                <Skeleton height={12} width={90} radius="xl" ml="auto" />
              </Group>

              <Group gap="sm" align="center" wrap="nowrap">
                <Skeleton height={18} width={18} radius="sm" />
                <Skeleton height={12} width="60%" radius="xl" />
                <Skeleton height={12} width={110} radius="xl" ml="auto" />
              </Group>

              {/* Button row (not for current device) */}
              {!isCurrent && (
                <Button
                  fullWidth
                  radius="md"
                  variant="light"
                  disabled
                  styles={{
                    root: { paddingTop: 14, paddingBottom: 14 },
                  }}
                >
                  <Skeleton height={12} width={140} radius="xl" />
                </Button>
              )}
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}
