import { find } from 'lodash';

export const pickFirst = <T extends unknown[]>(...args: T) => {
  return find(args, (v) => v != null) as T[number] | undefined;
};
pickFirst(1, '');
