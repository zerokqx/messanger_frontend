import { Stack } from '@mantine/core';
import { Frown } from 'lucide-react';
import { WithIcon } from '../../WithIcon';
import type { ErrorComponentProp } from '../types/error.type';

export const NotData = ({ text }: ErrorComponentProp) => {
  return (
    <Stack align="center">
      <WithIcon iconSpan={2} icon={<Frown />}>
        {text}
      </WithIcon>
    </Stack>
  );
};
