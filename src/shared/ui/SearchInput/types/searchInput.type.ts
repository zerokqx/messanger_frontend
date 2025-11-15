import type { TextInputProps } from '@mantine/core';
import type { ChangeEvent } from 'react';

export interface SearchInputProp extends TextInputProps {
  action: (e: ChangeEvent<HTMLInputElement>) => void;
}
