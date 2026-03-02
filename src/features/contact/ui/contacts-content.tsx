import type { VirtualItem } from '@tanstack/react-virtual';
import type { RefObject } from 'react';
import { ContactCard, SkeletonContactItem } from '@/entities/contact';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import type { useContactListState } from '../model/use-contact-list-state';

type ContactsMap = ReturnType<typeof useContactListState>['contactsMap'];

interface ContactsContentProps {
  contactsMap: ContactsMap;
  hasNextPage: boolean;
  onRemove: (userId: string) => void;
  onSelect: (userId: string) => void;
  totalSize: number;
  virtualRows: VirtualItem[];
  viewportRef: RefObject<HTMLDivElement | null>;
}

export const ContactsContent = ({
  contactsMap,
  hasNextPage,
  onRemove,
  onSelect,
  totalSize,
  virtualRows,
  viewportRef,
}: ContactsContentProps) => {
  return (
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
          height: `${totalSize.toString()}px`,
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
                hasNextPage ? (
                  <SkeletonContactItem size={virtualRow.size} />
                ) : null
              ) : (
                <ContactCard
                  user={contact}
                  onRemove={(userId) => {
                    onRemove(userId);
                  }}
                  onClick={() => {
                    onSelect(contact.user_id);
                    layoutAction.doSetAside(true);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
