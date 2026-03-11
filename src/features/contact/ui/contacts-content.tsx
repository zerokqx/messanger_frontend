import { Virtuoso } from 'react-virtuoso';
import { ContactCard, SkeletonContactItem } from '@/entities/contact';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import type { useContactListState } from '../model/use-contact-list-state';
import { useParams } from '@tanstack/react-router';

type ContactsMap = ReturnType<typeof useContactListState>['contactsMap'];

interface ContactsContentProps {
  contactsMap: ContactsMap;
  hasNextPage: boolean;
  onRemove: (userId: string) => void;
  onSelect: (userId: string) => void;
  totalCount: number;
  onEndReached: () => void;
}

import { useState } from "react";

export const ContactsContent = ({
  contactsMap,
  onRemove,
  onSelect,
  totalCount,
  onEndReached,
}: ContactsContentProps) => {
  const { uuid } = useParams({ strict: false });
  const [scrolling, setScrolling] = useState(false);

  return (
    <Virtuoso
      style={{
        height: "100%",
        minHeight: 0,
      }}
      totalCount={totalCount}
      increaseViewportBy={150}
      endReached={onEndReached}
      isScrolling={setScrolling}
      itemContent={(index) => {
        const contact = contactsMap[index];


        return (
          <ContactCard
            simplification={scrolling}
            isSelected={uuid === contact.user_id}
            user={contact}
            onRemove={(userId) => {
              onRemove(userId);
            }}
            onClick={() => {
              onSelect(contact.user_id);
              layoutAction.doSetAside(true);
            }}
          />
        );
      }}
    />
  );
};
