import { Card, Group, Skeleton, Stack } from '@mantine/core';


export const SkeletonContactItem = ({ size }: { size: number }) => {
  return (
    <Card
      h={size}
      p="xs"
      radius="lg"
      withBorder
      w={'100%'}
      style={{ overflow: 'hidden' }}
    >
      <Group align="center" justify="space-between" wrap="nowrap" h="100%">
        <Group align="center" gap="sm" wrap="nowrap">
          <Skeleton circle h={38} w={38} />
          <Stack gap={6}>
            <Skeleton h={10} w={132} radius="xl" />
            <Skeleton h={8} w={92} radius="xl" />
          </Stack>
        </Group>
        <Skeleton h={24} w={24} radius="xl" />
      </Group>
    </Card>
  );
};
