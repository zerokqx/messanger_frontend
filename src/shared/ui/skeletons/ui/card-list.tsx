import {
  Group,
  Skeleton,
  Stack,
  type GroupProps,
  type SkeletonProps,
  type StackProps,
} from '@mantine/core';

interface SkeletonBaseProps<T> extends SkeletonProps {
  size?: number;
  containerProps?: T;
}
export const SkeletonsCardList = ({
  size = 5,
  containerProps,
  ...props
}: SkeletonBaseProps<StackProps>) => {
  return (
    <Stack {...containerProps}>
      {Array.from({ length: size }).map((i) => (
        <Skeleton w="100%" h={50} key={i} {...props} />
      ))}
    </Stack>
  );
};

export const SkeletonLayout = ({
  containerProps,
}: Omit<SkeletonBaseProps<GroupProps>, 'size'>) => {
  return (
      <Group opacity={0.3} h={'max-content'} {...containerProps}>
        <Skeleton h={200} w={200} />
        <Stack style={{ flex: 1 }}>
          <Skeleton height={100} />
          <Skeleton height={80} />
        </Stack>
        <Skeleton height={50} />
      </Group>
  );
};
