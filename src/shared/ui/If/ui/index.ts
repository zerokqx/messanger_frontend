import type { ReactNode } from 'react';

export const If = ({
  operandFirst,
  operandSecond,
  children,
}: {
  operandFirst: unknown;
  operandSecond: unknown;
  children: ReactNode;
}) => {
  return operandFirst === operandSecond ? children : null;
};
