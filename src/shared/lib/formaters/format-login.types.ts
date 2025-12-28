import type { Fn } from '@/shared/types/utils/functions';

type Params = [
  login: string | undefined | null,
  custom_name: string | undefined | null,
];

export type FormatLoginViaCutomNameFn = Fn<
  Params,
  {
    format: string;
    name: string;
    params: Params;
  }
>;
