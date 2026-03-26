import type { TextareaProps } from '@mantine/core';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  disabled?: boolean;
  isPending?: boolean;
  placeholder?: string;
  inputProps?: TextareaProps;
}
