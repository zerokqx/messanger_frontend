import type { Fn } from '@/shared/types/utils/functions';
import type { SessionsListData } from '@/shared/api/orval/auth-service/auth-service.schemas';

type SortSessionsByIsCurrent<
  Sessions = SessionsListData['sessions'],
> = Fn<[sessions: Sessions], Sessions>;

export const sortSessionsByIsCurrent: SortSessionsByIsCurrent = (sessions) => {
  return [...sessions].sort((a, b) => {
    return Number(b.is_current) - Number(a.is_current);
  });
};
