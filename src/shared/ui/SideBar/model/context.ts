import { createContext } from 'react';
import type { SelecteContextTypes } from '../types/context.type';

export const SelecteContext = createContext<SelecteContextTypes | undefined>(
  undefined
);
