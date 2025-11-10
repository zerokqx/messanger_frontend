import type { Windows, CreateTabStore } from '../types';

export type TaberContextLocalState<
  T extends string,
  W extends Windows,
> = Record<T, CreateTabStore<W[number]>>;
