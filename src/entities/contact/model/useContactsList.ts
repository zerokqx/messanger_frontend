import type { Fn } from '@/shared/types/utils/functions';
import type { useContactsListFetch } from '../api/useContactsListFetch';
import { useContacts, type UseContactsStore } from './useContacts';
import { useEffect, useMemo } from 'react';
import { flatMap, forEach } from 'lodash';

/**
 * Connector logic for `useContacts` store
 */
export const useCSContactsList: Fn<
  [ReturnType<typeof useContactsListFetch>['data']],
  UseContactsStore
> = (data) => {
  const contacts = useContacts((s) => s.data);

  const flatMapContacts = useMemo(
    () => flatMap(data?.pages, (contact) => contact.data.items),
    [data]
  );
  const update = useContacts((s) => s.update);
  useEffect(() => {
    console.log('UP');
    const uuids: string[] = [];
    const users: UseContactsStore['users'] = {};
    forEach(flatMapContacts, (contact) => {
      const uuid = contact.user_id;
      uuids.push(uuid);
      users[uuid] = contact;
    });

    update((s) => {
      s.users = users;
      s.uuids = uuids;
    });
  }, [update, flatMapContacts]);
  return contacts;
};
