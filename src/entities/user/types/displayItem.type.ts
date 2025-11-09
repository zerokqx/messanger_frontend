import type { DescriptionProp } from '@/shared/ui/Description/types/description.type';
import type { WithIconProp } from '@/shared/ui/WithIcon/types';
import type { TextProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface DisplayItemProp {
  descText: string;
  children?: ReactNode;
  icon: WithIconProp['icon'];
  display: string | null | undefined;
  descProp?: Omit<DescriptionProp, 'desc' | 'children'>;
  onClick?: WithIconProp['onClick'];
  withIconProp?: Omit<WithIconProp, 'icon' | 'onClick'>;
  textProp?: TextProps;
}
