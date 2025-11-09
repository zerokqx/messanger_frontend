import type { StateCreator } from 'zustand';

export const dirty =
  <S extends { dirty: boolean }>(config: StateCreator<S>): StateCreator<S> =>
  (set, get, store) => {
    const wrappedSet: typeof set = (partial, replace) => {
      const newState = typeof partial === 'function' ? partial(get()) : partial;

      if (replace) {
        set({ ...newState, dirty: true } as S, true);
      } else {
        set(
          { ...newState, dirty: true } as Partial<S> | ((s: S) => Partial<S>),
          false
        );
      }
    };

    return config(wrappedSet, get, store);
  };
