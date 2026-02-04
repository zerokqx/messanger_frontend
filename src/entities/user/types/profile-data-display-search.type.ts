import type { components } from '@/shared/types/v1';
import type { ReactNode } from 'react';

export interface ProfileDataDisplaySearchProp {
  header?: (props: Omit<ProfileDataDisplaySearchProp, 'header'>) => ReactNode;
  user: components['schemas']['ProfileByUserIdData'];
}
