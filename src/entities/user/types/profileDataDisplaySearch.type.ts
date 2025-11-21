import type { UserSearchItem, UserWithUUID } from '@/shared/types/api/schemas';
import type { ReactNode } from 'react';

export interface ProfileDataDisplaySearchProp extends UserSearchItem {
  header?: (props: Omit<ProfileDataDisplaySearchProp, 'header'>) => ReactNode;
}
