import { Alert } from '@mantine/core';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Ban, CircleSlash } from 'lucide-react';
import { lazy, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useContactRemove } from '../api';
import { useContactListState } from '../model/use-contact-list-state';

const ContactsContent = lazy(() =>
  import('./contacts-content.tsx').then((m) => ({ default: m.ContactsContent }))
);

export const ContactsList = () => {
  const selectUser = useSetUuidForRouter();
  const { contacts, count, contactsMap } = useContactListState();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [t] = useTranslation('contact');
  const { mutate: removeContact } = useContactRemove();

  const virtualizer = useVirtualizer({
    count: count.data ?? 0,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => 54,
    overscan: 20,
    getItemKey: (index) =>
      contactsMap[index]?.user_id ?? `skeleton-${index.toString()}`,
    onChange: ({ range }) => {
      if (
        range &&
        contacts.hasNextPage &&
        !contacts.isFetchingNextPage &&
        range.endIndex >= contactsMap.length - 1
      ) {
        void contacts.fetchNextPage();
      }
    },
  });

  if (contacts.isError || count.error) {
    return (
      <Alert icon={<Ban />} color="red">
        {t('contacts-load-error')}
      </Alert>
    );
  }

  if (!count.data && !count.isLoading) {
    return <Alert icon={<CircleSlash />}>{t('contacts-empty')}</Alert>;
  }


  return (
      <ContactsContent
        contactsMap={contactsMap}
        hasNextPage={contacts.hasNextPage}
        onRemove={(userId) => {
          pendingNotify(t('contact-remove-pending'));
          removeContact(
            {
              body: { user_id: userId },
            },
            {
              onSuccess() {
                successNotify(t('contact-remove-success'));
              },
            }
          );
        }}
        onSelect={(userId) => {
          void selectUser(userId);
        }}
        totalSize={virtualizer.getTotalSize()}
        virtualRows={virtualizer.getVirtualItems()}
        viewportRef={viewportRef}
      />
  );
};
