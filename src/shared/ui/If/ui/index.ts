import type { ReactNode } from 'react';

export const If = <Operands extends string>({
  operandFirst,
  operandSecond,
  children,
}: {
  operandFirst: Operands;
  operandSecond: Operands;
  children: ReactNode;
}) => {
  return operandFirst === operandSecond ? children : null;
};
