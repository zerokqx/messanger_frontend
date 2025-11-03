import { Text, type TextProps } from '@mantine/core';
import type { ReactNode } from 'react';

export const DescText = ({
  children,
  ...props
}: { children: ReactNode } & TextProps) => {
  return (
    <Text fw={100} c={'dark.3'} {...props}>
      {children}
    </Text>
  );
};
