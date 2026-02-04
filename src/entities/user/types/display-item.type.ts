import type { DescriptionProp } from '@/shared/ui/description/types/description.type';
import type { WithIconProp } from '@/shared/ui/with-icon/types';
import type { TextProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface DisplayItemProp {
  descText: string;
  children?: ReactNode;
  copied?: boolean;
  icon: WithIconProp['icon'];
  display: string | null | undefined;
  descProp?: Omit<DescriptionProp, 'desc' | 'children'>;
  withIconProp?: Omit<WithIconProp, 'icon'>;
  textProp?: TextProps;
}
