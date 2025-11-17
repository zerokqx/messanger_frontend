import type { Fn } from '@/shared/types/utils/functions';
import type { Concatenation } from '@/shared/types/utils/strings';
import type { BufferData } from './data.type';

export type AllowAction = 'push' | 'l' | 'clear';

export type BufferActionPush = Fn<[BufferData], void>;
export type BufferActionPop = Fn<[], BufferData | undefined>;
export type BufferActionClear = Fn<[], void>;

export type Action<
  K extends string,
  A extends AllowAction,
  F extends Fn,
> = Record<Concatenation<K, Capitalize<A>>, F>;

export type BufferActions<K extends string> = Action<
  K,
  'push',
  BufferActionPush
> &
  Action<K, 'l', BufferActionPop> &
  Action<K, 'clear', BufferActionClear>;
