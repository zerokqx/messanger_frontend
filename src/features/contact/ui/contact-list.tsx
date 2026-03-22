import { Alert, Box } from '@mantine/core';
import { useNavigate, useParams, useRouterState } from '@tanstack/react-router';
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
import { chatExists, useChatCreate } from '@/entities/chat';
import type { DexieChatId } from '@/shared/api';
import { useCreateIfNotExistsChat } from '@/entities/chat/model/create-if-not-exists';
import { selectedChatAction } from '@/features/chat';

export const ContactsList = () => {
  const { contacts, count, contactsMap } = useContactListState();
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const hash = useRouterState({ select: (s) => s.location.hash });
  const {smartCreateMutate} = useChatCreate();
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
      totalCount={count.data ?? 0}
      computeItemKey={(_, contact) => contact.user_id}
      increaseViewportBy={150}
      endReached={() => {
        if (contacts.hasNextPage && !contacts.isFetchingNextPage) {
          void contacts.fetchNextPage();
        }
      }}
      isScrolling={setScrolling}
      itemContent={(index, contact) => {
        const isSkeleton = index >= contactsMap.length;

        if (isSkeleton) {
          return <SkeletonContactItem size={60} />;
        }

        return (
          <ContactCard
            simplification={scrolling}
            isSelected={hash.slice(1) === contact.user_id}
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
