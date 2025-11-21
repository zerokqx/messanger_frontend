import type { ProfileDataDisplaySearchProp } from '../types/profileDataDisplaySearch.type';

export const formatLoginViaCustomName = (
  login: ProfileDataDisplaySearchProp['profile']['login'],
  customName: ProfileDataDisplaySearchProp['profile']['custom_name']
) => {
  if (login) {
    return customName ? `${customName}(@${login})` : `@${login}`;
  } else return null;
};
