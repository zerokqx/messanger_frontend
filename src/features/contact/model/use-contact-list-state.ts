import { useContactCountQuery } from '@/entities/contact';
import { useGetContactsContactListGetSuspenseInfinite } from '@/shared/api/orval/user-service/v1-user/v1-user';
import type {
  ContactInfo,
  ContactInfoResponse,
} from '@/shared/api/orval/user-service/user-service.schemas';
import { pagesMap } from '@/shared/lib/pages-map';
import { useMemo } from 'react';

const CONTACTS_LIMIT = 10;

export const useContactListState = () => {
  const contacts = useGetContactsContactListGetSuspenseInfinite(
    { limit: CONTACTS_LIMIT },
    {
      query: {
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages, lastOffset) => {
          if (!lastPage.data.has_more) {
            return undefined;
          }

          return (lastOffset ?? 0) + lastPage.data.items.length;
        },
      },
    }
  );
  const count = useContactCountQuery();
  const contactsMap = useMemo<ContactInfo[]>(
    () => pagesMap<ContactInfoResponse>(contacts.data),
    [contacts.data]
  );

  return { contacts, count, contactsMap };
};
