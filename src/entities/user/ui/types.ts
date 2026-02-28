import type { ReactNode } from 'react';
import type { TUserState } from '../model/types';
import type { components } from '@/shared/types/v1';


export interface ProfileDataDisplayProp extends TUserState {
  header?: (props: Omit<ProfileDataDisplayProp, 'header'>) => ReactNode;
}

export interface ProfileDataDisplaySearchProp {
  header?: (props: Omit<ProfileDataDisplaySearchProp, 'header'>) => ReactNode;
  user: components['schemas']['ProfileByUserIdData'];
}
