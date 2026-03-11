import type { components } from '@/shared/types/v1';
import type { GridProps } from '@mantine/core';

export interface IContactElementProp {
  user: components['schemas']['ContactInfo'];
  onClick?: GridProps['onClick'];
  onRemove?: (id: string) => void;
  simplification?: boolean;
  isSelected?: boolean;
}
