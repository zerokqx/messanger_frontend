import { Alert, Center, Loader } from '@mantine/core';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Ban, CircleSlash } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { ContactCard, SkeletonContactItem } from '@/entities/contact';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useContactRemove } from '../api';
import { useContactListState } from '../model/use-contact-list-state';
import { useChatCreate } from '@/entities/chat';
import { selectedChatAction } from '@/features/chat';

export const ContactsList = () => {
  const { contacts, count, contactsMap } = useContactListState();
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const hash = useRouterState({ select: (s) => s.location.hash });
  const { smartCreateMutate } = useChatCreate();
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
            isSelected={hash.slice(1) === contact.user_id}
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
              const chat = await smartCreateMutate(contact.user_id);
              await navigate({ hash: chat.user_id });
              selectedChatAction.doSelect(chat.chat_id);
              layoutAction.doSetAside(true);
            }}
          />
        );
      }}
    />
  );
};
