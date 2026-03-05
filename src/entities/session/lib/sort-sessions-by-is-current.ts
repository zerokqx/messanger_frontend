import type { Fn } from '@/shared/types/utils/functions';
import type { components } from '@/shared/types/v1';

type SortSessionsByIsCurrent<
  Sessions = components['schemas']['SessionsListData']['sessions'],
> = Fn<[sessions: Sessions], Sessions>;

export const sortSessionsByIsCurrent: SortSessionsByIsCurrent = (sessions) => {
  return [...sessions].sort((a, b) => {
    return Number(b.is_current) - Number(a.is_current);
  });
};
