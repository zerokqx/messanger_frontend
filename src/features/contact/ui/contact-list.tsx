import { Alert, Center, Loader } from '@mantine/core';
import { Ban, CircleSlash } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { ContactCard } from '@/entities/contact';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useContactRemove } from '../api';
import { useContactListState } from '../model/use-contact-list-state';
import { useChatUserId } from '@/entities/chat';

export const ContactsList = () => {
  const { contacts, count, contactsMap } = useContactListState();
  const { setUserId, userId } = useChatUserId();
  const [scrolling, setScrolling] = useState(false);
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
      data={contactsMap}
      style={{
        height: '100%',
        minHeight: 0,
      }}
      components={{
        Footer: () =>
          contacts.isFetchingNextPage ? (
            <Center py="sm">
              <Loader size="sm" />
            </Center>
          ) : null,
      }}
      computeItemKey={(_, contact) => contact.user_id}
      endReached={() => {
        if (contacts.hasNextPage && !contacts.isFetchingNextPage) {
          void contacts.fetchNextPage();
        }
      }}
      isScrolling={setScrolling}
      itemContent={(_index, contact) => {
        return (
          <ContactCard
            simplification={scrolling}
            isSelected={userId === contact.user_id}
            user={contact}
            onRemove={(userId) => {
              pendingNotify(t('contact-remove-pending'));
              removeContact(
                {
                  data: { user_id: userId },
                },
                {
                  onSuccess() {
                    successNotify(t('contact-remove-success'));
                  },
                }
              );
            }}
            onClick={async () => {
              await setUserId(contact.user_id);
            }}
          />
        );
      }}
    />
  );
};
