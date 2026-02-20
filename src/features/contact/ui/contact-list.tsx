import { Alert } from '@mantine/core';
import { Ban, CircleSlash } from 'lucide-react';
import { ContactItem, SkeletonContactItem } from '@/entities/contact';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useContactRemove } from '../api';
import { useContactListState } from '../model/use-contact-list-state';
import { Suspense, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTranslation } from 'react-i18next';

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
  const virtualRows = virtualizer.getVirtualItems();
  if (contacts.isError) {
    return (
      <Alert icon={<Ban />} color="red">
        {t('contacts-load-error')}
      </Alert>
    );
  }
  if (!count.data) {
    return (
      <Alert icon={<CircleSlash />}>{t('contacts-empty')}</Alert>
    );
  }
  return (
    <Suspense
      fallback={Array.from({ length: count.data }).map((_, i) => (
        <SkeletonContactItem key={i} size={60} />
      ))}
    >
      <div
        ref={viewportRef}
        style={{
          height: '100%',
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize().toString()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualRows.map((virtualRow) => {
            const contact = contactsMap[virtualRow.index];
            const isSkeleton = virtualRow.index >= contactsMap.length;
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size.toString()}px`,
                  transform: `translateY(${virtualRow.start.toString()}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {isSkeleton ? (
                  contacts.hasNextPage ? (
                    <SkeletonContactItem size={virtualRow.size} />
                  ) : null
                ) : contact ? (
                  <ContactItem
                    user={contact}
                    onRemove={(user_id) => {
                      pendingNotify(t('contact-remove-pending'));
                      removeContact(
                        {
                          body: { user_id },
                        },
                        {
                          onSuccess() {
                            successNotify(t('contact-remove-success'));
                          },
                        }
                      );
                    }}
                    onClick={() => {
                      void selectUser(contact.user_id);
                      layoutAction.doSetAside(true);
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
};
