import type { LiteralFromArray } from '@/shared/types/utils/literal';
import { derive } from 'derive-zustand';
import { forEach as foreachDash } from 'lodash';
import type { UnknownArray, UnknownRecord } from 'type-fest';
import { create, useStore, type StoreApi, type UseBoundStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { BufferData } from './data.type';
import type {
  BufferActions,
  BufferActionPush,
  BufferActionPop,
  BufferActionClear,
} from './buffer.type';
import type { DType } from './d.type';
import { createComputed } from 'zustand-computed';
import { useMemo } from 'react';
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
  const useL = (r: R[number]) => {
    const devide = useMemo(
      () => derive((get) => get(store).d(r)[`${r}L`]),
      [r]
    );
  };
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
