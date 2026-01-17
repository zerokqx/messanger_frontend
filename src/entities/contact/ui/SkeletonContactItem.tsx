import { Group, Skeleton } from '@mantine/core';

export const SkeletonContactItem = ({ size }: { size: number }) => {
  return (
    <Group h={size} align="center" justify="space-between" w={'100%'}>
      <Group align="center">
        <Skeleton circle h={40} w={40} />
        <Skeleton h={10} w={100} />
      </Group>
      <Skeleton h={30} w={30} bdrs={'xl'} />
    </Group>
  );
};
