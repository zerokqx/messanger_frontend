import {
  useContactCountQuery,
  useContactsQuery,
} from '@/entities/contact';
import { pagesMap } from '@/shared/lib/pages-map';
import { useMemo } from 'react';

export const useContactListState = () => {
  const contacts = useContactsQuery(10);
  const count = useContactCountQuery();
  const contactsMap = useMemo(() => pagesMap(contacts.data), [contacts.data]);
  return { contacts, count, contactsMap };
};
