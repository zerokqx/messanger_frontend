import type { ReplaceTypeKey } from '../user/types/permissionsModificate.type';
import _ from 'lodash';
/**
 * Function for search type value and convert to target typed
 *
 */
export const catchAndChange = <
  Extends = number,
  Replace = string,
  T extends object = object,
>(
  obj: T,
  search: string,
  modificator: (k: keyof T, v: T[keyof T]) => Replace
): ReplaceTypeKey<T, Extends, Replace> => {
  return _.transform(
    obj,
    (acc, v, k) => {
      type TAcc = Record<keyof T, unknown>;
      if (typeof obj[k] === search) {
        (acc as TAcc)[k] = modificator(k, v);
      } else {
        (acc as TAcc)[k] = v;
      }
    },
    {}
  ) as ReplaceTypeKey<T, Extends, Replace>;
};
const d = catchAndChange({ d: 1, W: '1' }, 'string', (_, v) => Number(v));
