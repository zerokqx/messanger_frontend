import z from 'zod';
import type { StateCreator } from 'zustand';

export const validateToken =
  <S extends { access: string }>(config: StateCreator<S>): StateCreator<S> =>
  (set, get, store) => {
    const wrappedSet: typeof set = (partial, replace) => {
      const state: Partial<S> =
        typeof partial === 'function' ? partial(get()) : partial;

      if (state.access && z.jwt().safeParse(state.access).success) {
        if (replace) {
          set(partial as S, true);
        } else {
          set(partial as Partial<S> | ((s: S) => Partial<S>), false);
        }
        console.info('Токен изменен');
      } else {
        set({ access: '' } as S);
        console.warn('Новые данные с невалидным токеном, обновление отменено');
        // Можно добавить очистку состояния или другую реакцию
      }
    };

    return config(wrappedSet, get, store);
  };
