import type { FormatLoginViaCutomNameFn } from './format-login.types.ts';

export const formatLogin: FormatLoginViaCutomNameFn = (login, customName) => {
  const loginFallback = login ?? '';
  const format = customName
    ? `${customName}(@${loginFallback})`
    : `@${loginFallback}`;
  const name = customName ?? login ?? '';
  return { format, name, params: [login, customName] };
};
