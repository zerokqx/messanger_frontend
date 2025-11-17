import { Collapse } from '@mantine/core';
import type { ReactNode } from 'react';

export const CollapseActions = ({
  children,
  opened,
}: {
  children: ReactNode;
  opened: boolean;
}) => {
  return <Collapse   in={opened}>{children}</Collapse>;
};
