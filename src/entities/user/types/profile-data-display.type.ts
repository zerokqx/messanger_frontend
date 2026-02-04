import type { ReactNode } from 'react';
import type { TUserState } from './user-store.type';

export interface ProfileDataDisplayProp extends TUserState {
  header?: (props: Omit<ProfileDataDisplayProp, 'header'>) => ReactNode;
}
