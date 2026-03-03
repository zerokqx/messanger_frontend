import type { Fn } from '@/shared/types/utils/functions';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Asyncify } from 'type-fest';

export interface VirtualListProp<D extends unknown[] = unknown[]> {
  data: D;
  count: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchFunction: Asyncify<Fn>;
  render: Fn<[D[number]], ReactNode>;
  fallback?: Fn<[number], ReactNode>;
  dataSelect: Fn<[D, number], D[number] | undefined>;
  esimateSize: Fn<[number], number>;
  overscan?: number;
  scrollAreaProps?: ComponentPropsWithoutRef<'div'>;
}
