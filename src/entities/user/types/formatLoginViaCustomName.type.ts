import type { Fn } from '@/shared/types/utils/functions';
import type { ProfileDataDisplaySearchProp } from './profileDataDisplaySearch.type';

type Params = [
  login: ProfileDataDisplaySearchProp['profile']['login'],
  custom_name: ProfileDataDisplaySearchProp['profile']['custom_name'],
];

export type FormatLoginViaCutomNameFn = Fn<
  Params,
  {
    format: string;
    name: string;
    params: Params;
  }
>;
