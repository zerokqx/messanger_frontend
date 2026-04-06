import type { ProfilePermissionsRequest } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { forEach, toNumber } from 'lodash';

export type ProfilePermissions = ProfilePermissionsRequest;
export type PermissionsUnkeyed = {
  [K in keyof ProfilePermissions]: ProfilePermissions[K] | string;
};

export const normilizePermissions = (
  permissions: PermissionsUnkeyed
): ProfilePermissions => {
  const keysForNullNormalize = [
    'auto_delete_after_days',
  ] as const satisfies readonly (keyof ProfilePermissions)[];

  const keysForNumberNormalize = [
    'last_seen_visibility',
    'public_invite_permission',
    'group_invite_permission',
    'call_permission',
  ] as const satisfies readonly (keyof ProfilePermissions)[];
  const copy = { ...permissions };
  forEach(keysForNullNormalize, (key) => {
    const value = copy[key];
    if (value === 'null') copy[key] = null;
  });
  forEach(keysForNumberNormalize, (key) => {
    const value = copy[key];
    copy[key] = toNumber(value);
  });
  return copy as ProfilePermissions satisfies ProfilePermissions;
};
