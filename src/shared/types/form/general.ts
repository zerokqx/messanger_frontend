import type {
  UseMutateAsyncFunction,
  UseMutateFunction,
} from '@tanstack/react-query';

export interface FormGeneralProp<
  Mutate extends UseMutateAsyncFunction | UseMutateFunction,
> {
  mutate: Mutate;
}
