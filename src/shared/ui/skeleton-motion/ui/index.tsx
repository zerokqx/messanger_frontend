import { Skeleton, type SkeletonProps } from '@mantine/core';
import { motion, type MotionProps } from 'motion/react';

interface MotionSkeletonProps {
  motionProps?: MotionProps;
  skeletonProps: SkeletonProps;
}
export const MotionSkeleton = ({
  motionProps,
  skeletonProps,
}: MotionSkeletonProps) => (
  <motion.div {...motionProps}>
    <Skeleton {...skeletonProps} />
  </motion.div>
);
