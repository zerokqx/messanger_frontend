import { Alert } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { Ban, CircleSlash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { ContactCard, SkeletonContactItem } from '@/entities/contact';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useContactRemove } from '../api';
import { useContactListState } from '../model/use-contact-list-state';

export const ContactsList = () => {
  const selectUser = useSetUuidForRouter();
  const { contacts, count, contactsMap } = useContactListState();
  const { uuid } = useParams({ strict: false });
  const [t] = useTranslation('contact');
  const { mutate: removeContact } = useContactRemove();

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
      increaseViewportBy={320}
      endReached={() => {
        if (contacts.hasNextPage && !contacts.isFetchingNextPage) {
          void contacts.fetchNextPage();
        }
      }}
      itemContent={(index) => {
        const contact = contactsMap[index];
        const isSkeleton = index >= contactsMap.length;

        if (isSkeleton) {
          return contacts.hasNextPage ? (
            <SkeletonContactItem size={60} />
          ) : null;
        }

        return (
          <ContactCard
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
