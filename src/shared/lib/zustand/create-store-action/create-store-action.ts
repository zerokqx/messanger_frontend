import { fromPairs, zip } from 'lodash';
import type { Fn } from '@/shared/types/utils/functions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn = (...args: any[]) => any; // чтобы не потерять конкретные сигнатуры функций
type TupleKeys<T extends readonly unknown[]> = Extract<keyof T, `${number}`>;

/**
 * Типовой camelCase для snake/kebab/camel.
 * (Не 1-в-1 lodash, но соответствует идее: "_" и "-" режем, остальное капитализируем.)
 */
type ToCamel<S extends string> = S extends `${infer A}_${infer B}`
  ? `${Lowercase<A>}${Capitalize<ToCamel<B>>}`
  : S extends `${infer A}-${infer B}`
    ? `${Lowercase<A>}${Capitalize<ToCamel<B>>}`
    : S;

type DoKey<K extends string> = `do${Capitalize<ToCamel<K>>}`;

type ZipToDoObject<
  Names extends readonly string[],
  Actions extends readonly unknown[],
> = {
  [I in TupleKeys<Names> & TupleKeys<Actions> as DoKey<Names[I]>]: Actions[I];
};

// interface ISettings {
//   store: CreateStoreType<any>;
//   defaultAction?: boolean;
// }

export const createStoreAction = <
  const Actions extends readonly [AnyFn, ...AnyFn[]],
  const Names extends readonly [string, ...string[]],
  // Settings extends ISettings,
>(
  actions: Actions & readonly Fn[],
  names: Names & { length: Actions['length'] }
  // settings?: Settings
): ZipToDoObject<Names, Actions> => {
  if (names.length !== actions.length) {
    throw new Error('Array length first and second param not equals');
  }

  const doNames = names.map(
    (name) => `do${name.charAt(0).toUpperCase() + name.slice(1)}`
  );

  return fromPairs(zip(doNames, actions)) as unknown as ZipToDoObject<
    Names,
    Actions
  >;
};
