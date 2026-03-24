import { useContactCountQuery, useContactsQuery } from '@/entities/contact';
import type {
  ContactInfo,
  ContactInfoResponse,
} from '@/shared/api/orval/user-service/user-service.schemas';
import { pagesMap } from '@/shared/lib/pages-map';
import { useMemo } from 'react';
import { useLogger } from 'react-use';


export const useContactListState = () => {
  const contacts = useContactsQuery()
  useLogger("Contacts",[contacts])
  const count = useContactCountQuery();
  const contactsMap = useMemo<ContactInfo[]>(
    () => pagesMap<ContactInfoResponse>(contacts.data),
    [contacts.data]
  );

  return { contacts, count, contactsMap };
};
