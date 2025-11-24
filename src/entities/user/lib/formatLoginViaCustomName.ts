import type { FormatLoginViaCutomNameFn } from '../types/formatLoginViaCustomName.type';

export const formatLoginViaCustomName: FormatLoginViaCutomNameFn = (
  login,
  customName
) => {
  const loginFallback = login ?? '';
  const format = customName
    ? `${customName}(@${loginFallback})`
    : `@${loginFallback}`;
  const name = customName ?? login ?? '';
  return { format, name, params: [login, customName] };
};
