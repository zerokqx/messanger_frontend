import { upperFirst, lowerCase } from 'lodash';
import { useMemo } from 'react';
import type { UseSettingsGet, UseSettingsReturnType } from './types';
import { useUserStore } from '../model';
import { useMe } from '../model/me.query';

export const useGetSettings: UseSettingsGet = () => {
  const { data } = useMe();
  const keys = useMemo(
    () =>
      Object.keys(
        data?.profile_permissions ?? {}
      ) as (keyof typeof data.profile_permissions)[],
    [data?.profile_permissions]
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
