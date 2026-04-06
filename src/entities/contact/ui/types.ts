import type { ContactInfo } from '@/shared/api/orval/user-service/user-service.schemas';
import type { GridProps } from '@mantine/core';

export interface IContactElementProp {
  user: ContactInfo;
  onClick?: GridProps['onClick'];
  onRemove?: (id: string) => void;
  simplification?: boolean;
  isSelected?: boolean;
}
