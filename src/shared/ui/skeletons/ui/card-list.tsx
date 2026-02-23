import {
  Skeleton,
  Stack,
  type SkeletonProps,
  type StackProps,
} from '@mantine/core';

interface SkeletonCardListProps extends SkeletonProps {
  size?: number;
  containerProps?: StackProps;
}
export const SkeletonsCardList = ({
  size = 5,
  containerProps,
  ...props
}: SkeletonCardListProps) => {
  return (
    <Stack {...containerProps}>
      {Array.from({ length: size }).map((i) => (
        <Skeleton w="100%" h={50} key={i} {...props} />
      ))}
    </Stack>
  );
};
