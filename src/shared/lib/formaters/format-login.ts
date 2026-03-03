import type { FormatLoginViaCutomNameFn } from './format-login.types.ts';

export const formatLogin: FormatLoginViaCutomNameFn = (
  login,
  customName,
  withDog = true
) => {
  const loginFallback = login ?? '';
  const dog = withDog ? '@' : '';

  const format = customName
    ? `${customName}(${dog}${loginFallback})`
    : `${dog}${loginFallback}`;

  const name = customName ?? login ?? '';

  return { format, name, params: [login, customName] };
};
