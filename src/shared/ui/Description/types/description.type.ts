import type { FlexProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface DescriptionProp extends FlexProps {
  desc: string;
  children: ReactNode;
}
