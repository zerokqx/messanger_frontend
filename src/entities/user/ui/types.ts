import type { DescriptionProp } from '@/shared/ui/description/types/description.type';
import type { WithIconProp } from '@/shared/ui/with-icon/types';
import type { TextProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { TUserState } from '../model/types';
import type { components } from '@/shared/types/v1';

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

export interface ProfileDataDisplayProp extends TUserState {
  header?: (props: Omit<ProfileDataDisplayProp, 'header'>) => ReactNode;
}

export interface ProfileDataDisplaySearchProp {
  header?: (props: Omit<ProfileDataDisplaySearchProp, 'header'>) => ReactNode;
  user: components['schemas']['ProfileByUserIdData'];
}
