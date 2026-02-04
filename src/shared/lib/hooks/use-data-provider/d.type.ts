import type { LiteralFromArray } from '@/shared/types/utils/literal';
import type { BufferActions } from './buffer.type';

export type DType<R extends LiteralFromArray> = <K extends R[number]>(
  r: K
) => BufferActions<K>;
