import { Stack } from '@mantine/core';
import { Frown } from 'lucide-react';
import { WithIcon } from '../../WithIcon';
import type { ErrorComponentProp } from '../types/error.type';
import { motion } from 'motion/react';

const MotionStack = motion.create(Stack);

export const NotData = ({ text }: ErrorComponentProp) => {
  return (
    <MotionStack
      initial={{ x: 0, opacity: 0 }}
      animate={{
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
      align="center"
    >
      <WithIcon iconSpan={2} icon={<Frown />}>
        {text}
      </WithIcon>
    </MotionStack>
  );
};
