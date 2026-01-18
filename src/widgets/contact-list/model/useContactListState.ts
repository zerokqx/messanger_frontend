import {
  pagesMap,
  useContactCountQuery,
  useContactsQuery,
} from '@/entities/contact';

export const useContactListState = () => {
  const contacts = useContactsQuery(10);
  const count = useContactCountQuery();
  const contactsMap = pagesMap(contacts.data);
  return { contacts, count, contactsMap };
};
