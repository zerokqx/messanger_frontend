import type { CreateTabStore } from '../types/createTabStore.type';

export const Taber = <
  T extends string = 'main' | 'second',
  S extends CreateTabStore<T> = CreateTabStore<T>,
>({
  store,
}: {
  store: S;
}) => {
  const {} = store;
};
