import { useQueryState } from 'nuqs';

export type NuqsTabKey = `t${string}`;

export function useNuqsTab<T extends string>(
  key: NuqsTabKey,
  defaultValue: T = '' as T
) {
  return useQueryState<T>(key, {
    history: 'push',
    defaultValue,
  });
}
