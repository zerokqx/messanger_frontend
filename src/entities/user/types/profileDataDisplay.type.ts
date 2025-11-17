import type { ReactNode } from 'react';

export interface ProfileDataDisplayProp {
  login: string;
  header?: (props: Omit<ProfileDataDisplayProp, 'header'>) => ReactNode;
  rating: number;
  bio: string;
  fullName: string;
}
