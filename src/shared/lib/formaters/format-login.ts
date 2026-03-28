import type { NullUndefined } from '@/shared/types/utils/null-undefined.ts';
import type { FormatLoginViaCutomNameFn } from './format-login.types.ts';

export interface FormatLoginResult {
  format: string;
  name: string;
  params: [NullUndefined<string>, NullUndefined<string>];
}

export const formatLogin: FormatLoginViaCutomNameFn = (
  login,
  customName,
  withDog = true
): FormatLoginResult => {
  const loginFallback = login ?? '';
  const dog = withDog ? '@' : '';

  const format = customName
    ? `${customName}(${dog}${loginFallback})`
    : `${dog}${loginFallback}`;

  const name = customName ?? login ?? '';

  return { format, name, params: [login, customName] };
};
