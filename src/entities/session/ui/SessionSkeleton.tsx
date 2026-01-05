import { Skeleton } from '@mantine/core';
import type { SessionSkeletonProps } from './SessionSekeleton.types';
import { useId } from 'react';

export const SessionSkeleton = ({
  count = 1,
  visible,
}: SessionSkeletonProps) => {
  const id = useId();
  return Array.from({ length: count }).map(() => (
    <Skeleton
      key={id}
      opacity={0.5}
      w={'100%'}
      visible={visible}
      h={'100px'}
      bdrs={'xl'}
    />
  ));
};
