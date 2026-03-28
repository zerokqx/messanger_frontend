import type { Fn } from '@/shared/types/utils/functions';
import type { FormatLoginResult } from './format-login.ts';
import type { NullUndefined } from '@/shared/types/utils/null-undefined.ts';

type Params = [
  login: NullUndefined<string>,
  custom_name: NullUndefined<string>,
  withDog?: boolean,
];

export type FormatLoginViaCutomNameFn = Fn<Params, FormatLoginResult>;
