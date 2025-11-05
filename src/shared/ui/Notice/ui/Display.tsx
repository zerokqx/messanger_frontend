import { ThemeIcon } from '@mantine/core';
import type { DisplayProp } from '../types/display.type';

export const Display = ({ ...props }: DisplayProp) => {
  return (
    <>
      <ThemeIcon {...props} />
    </>
  );
};
