import type { TextInputProps } from '@mantine/core';

export interface SearchInputProp extends TextInputProps {
  action: (e: string) => void;
}
