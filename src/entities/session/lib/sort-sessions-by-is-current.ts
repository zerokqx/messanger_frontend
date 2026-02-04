import type { SortSessionsByIsCurrent } from './sort-sessions-by-is-current.type';

export const sortSessionsByIsCurrent: SortSessionsByIsCurrent = (
  sessions
) => {
  return [...sessions].sort((a, b) => {
    return Number(b.is_current) - Number(a.is_current);
  });
};
