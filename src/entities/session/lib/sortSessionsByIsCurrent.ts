import type { SortSessionsByIsCurrent } from './sortSessionsByIsCurrent.type';

export const sortSessionsByIsCurrent: SortSessionsByIsCurrent = (
  sessions
) => {
  return [...sessions].sort((a, b) => {
    return Number(b.is_current) - Number(a.is_current);
  });
};
