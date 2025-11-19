import type {
  UseMutateAsyncFunction,
  UseMutateFunction,
} from '@tanstack/react-query';

export type CallbacksMutate<Async extends boolean = true> = Async extends true
  ? Parameters<UseMutateAsyncFunction>[1]
  : Parameters<UseMutateFunction>[1];
