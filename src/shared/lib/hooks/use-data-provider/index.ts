import type { LiteralFromArray } from '@/shared/types/utils/literal';
import { forEach as foreachDash } from 'lodash';
import type { UnknownArray, UnknownRecord } from 'type-fest';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { BufferData } from './data.type';
import type {
  BufferActions,
  BufferActionPush,
  BufferActionPop,
  BufferActionClear,
} from './buffer.type';
import type { DType } from './d.type';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
type Buffers<A extends LiteralFromArray> = Record<A[number], BufferData[]>;
type RecipientsStructure<A extends LiteralFromArray> = Record<
  A[number],
  UnknownRecord
>;
const cache = {} as Record<R[number], BufferActions<R[number]>>;

export const createDataHook = <
  R extends LiteralFromArray,
  D extends RecipientsStructure<R>,
>(
  recipients: R,
  dataStructures: D
) => {
  const buffers = {} as Buffers<R>;
  foreachDash<R[number]>(recipients, (recipient) => {
    buffers[recipient] = [];
  });

  type StoreState = { d: DType<R> } & D & Buffers<R>;
  const store = create<StoreState>()(
    immer<StoreState>((set, get) => ({
      ...dataStructures,
      ...buffers,

      d<K extends R[number]>(r: K): BufferActions<K> {
        if (cache[r]) return cache[r];
        const pushKey = `${r}Push`;
        const lKey = `${r}L`;
        const clearKey = `${r}Clear`;

        const push: BufferActionPush = (value) => {
          value.id = Symbol();
          set((state) => {
            const draft = state as unknown as Record<string, unknown[]>;
            if (!Array.isArray(draft[r])) draft[r] = [];
            draft[r].push(value);
          });
        };

        const l: BufferActionPop = () => {
          const state = get(); // если хочешь, можно добавить get в сигнатуру immer
          const draft = state as unknown as Record<string, BufferData[]>;
          const arr = draft[r] ?? [];
          return arr.at(-1); // BufferData | undefined
        };
        const clear: BufferActionClear = () => {
          set((state) => {
            const draft = state as unknown as Record<string, UnknownArray>;
            draft[r] = [];
          });
        };

        const actions = {
          [pushKey]: push,
          [lKey]: l,
          [clearKey]: clear,
        } as BufferActions<K>;
        cache[r] = actions;
        return actions;
      },
    }))
  );
  return store;
};

// 1. Описываем состояние стора: один буфер и три экшена
export interface EventBusState {
  events: BufferData[];
  push: (value: BufferData) => void;
  peekLast: () => BufferData | undefined; // Переименовал 'l' для ясности
  clear: () => void;
}

// 2. Создаём хук-стор с помощью create
export const useEventBusStore = create<EventBusState>()(
  // Оборачиваем в immer для удобной работы с массивом
  immer((set, get) => ({
    // Начальное состояние
    events: [],

    /**
     * Добавляет новое событие (транзакцию) в общую шину.
     */
    push: (value) => {
      // Можно по-прежнему добавлять уникальный ID, если нужно
      value.id = Symbol();
      set((state) => {
        state.events.push(value);
      });
    },

    /**
     * Возвращает последнее событие из шины, НЕ удаляя его.
     */
    peekLast: () => {
      // get() позволяет прочитать состояние без вызова set
      return get().events.at(-1);
    },

    /**
     * Полностью очищает шину событий.
     */
    clear: () => {
      set((state) => {
        state.events = [];
      });
    },
  }))
);
export const useBus = createSelectorHooks(useEventBusStore);
