import { useAuth } from '@/shared/model/authProviderContext';
import type {
  UseSettingsGet,
  UseSettingsReturnType,
} from '../types/useSettingsGet.type';
import { key } from 'localforage';
import { lowerCase, upperFirst } from 'lodash';
import { useMemo } from 'react';
import type { TUserState } from '../types/userStore.type';
const formatLabel = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Auto Delete/g, 'Auto-Delete')
    .replace(/Seconds/g, ' (sec)');
};

export const useGetSettings: UseSettingsGet = ()  => {
  const allPermissions = useAuth((s) => s.user.profile_permissions);
  const keys = useMemo(
    () => Object.keys(allPermissions) as (keyof typeof allPermissions)[],
    [allPermissions]
  );

  const labels = useMemo(() => keys.map((key) => upperFirst (lowerCase(key))), [keys]);

  const d = useMemo(() => {
    return keys.map((key, i) => ({
      label: labels[i],
      type: typeof allPermissions[key] === 'boolean' ? 'checkbox' : 'select',
      key, // если нужно
    })) as UseSettingsReturnType[];
  },[keys, labels, allPermissions]);

  return d;
};
