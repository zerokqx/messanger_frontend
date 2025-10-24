export interface CreateTabStoreState<T extends string> {
  currentTab: T;
  prevTab: T | null;
}

export interface CreateTabStoreActions<T extends string> {
  setCurrentTab: (tab: T) => void;
  reset: () => void;
}

export type CreateTabStore<T extends string = string> = CreateTabStoreState<T> &
  CreateTabStoreActions<T>;
