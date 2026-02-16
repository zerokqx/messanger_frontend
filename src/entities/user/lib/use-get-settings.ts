import { upperFirst, lowerCase } from 'lodash';
import { useMemo } from 'react';
import type {
  UseSettingsGet,
  UseSettingsReturnType,
} from './types';
import { useUserStore } from '../model';

export const useGetSettings: UseSettingsGet = () => {
  const allPermissions = useUserStore((s) => s.data.user?.profile_permissions);
  const keys = useMemo(
    () => Object.keys(allPermissions ?? {}) as (keyof typeof allPermissions)[],
    [allPermissions]
  );

  const labels = useMemo(
    () => keys.map((key) => upperFirst(lowerCase(key))),
    [keys]
  );

  const d = useMemo(() => {
    return keys.map((key, i) => ({
      label: labels[i],
      type: typeof allPermissions[key] === 'boolean' ? 'checkbox' : 'select',
      key,
    })) as UseSettingsReturnType[];
  }, [keys, labels, allPermissions]);

  return d;
};
