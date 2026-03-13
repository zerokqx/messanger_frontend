import { Alert } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { Ban, CircleSlash } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { ContactCard, SkeletonContactItem } from '@/entities/contact';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useContactRemove } from '../api';
import { useContactListState } from '../model/use-contact-list-state';
import { useLogger } from '@mantine/hooks';

export const ContactsList = () => {
  const { uuid } = useParams({ strict: false });
  const selectUser = useSetUuidForRouter();
  const { contacts, count, contactsMap } = useContactListState();
  const [scrolling, setScrolling] = useState(false);
  const [t] = useTranslation('contact');
  const { mutate: removeContact } = useContactRemove();
  //[Save-Logger]
  useLogger("contactsMap",[contactsMap.length])
  //[Save-Logger]
  useLogger("contactsCount",[count.data])

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
    <Virtuoso
      style={{
        height: '100%',
        minHeight: 0,
      }}
      totalCount={count.data ?? 0}
      computeItemKey={(index) =>
        contactsMap[index]?.user_id ?? `skeleton-${index.toString()}`
      }
      increaseViewportBy={150}
      endReached={() => {
        if (contacts.hasNextPage && !contacts.isFetchingNextPage) {
          void contacts.fetchNextPage();
        }
      }}
      isScrolling={setScrolling}
      itemContent={(index) => {
        const contact = contactsMap[index];
        const isSkeleton = index >= contactsMap.length;

        if (isSkeleton) {
          return <SkeletonContactItem size={60} />
        }

        return (
          <ContactCard
            simplification={scrolling}
            isSelected={uuid === contact.user_id}
            user={contact}
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
            onClick={() => {
              void selectUser(contact.user_id);
              layoutAction.doSetAside(true);
            }}
          />
        );
      }}
    />
  );
};
