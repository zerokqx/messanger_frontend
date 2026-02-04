import type { Fn } from '@/shared/types/utils/functions';
import type { components } from '@/shared/types/v1';

export type SortSessionsByIsCurrent<
  Sessions = components['schemas']['SessionsListData']['sessions'],
> = Fn<[sessions: Sessions], Sessions>;
