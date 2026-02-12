import { VirtualList } from '@/shared/ui/virtual-list/ui/virtual-list';
import { Alert } from '@mantine/core';
import { Ban, CircleSlash } from 'lucide-react';
import { ContactItem, SkeletonContactItem } from '@/entities/contact';
import { useContactListState } from '../model/use-contact-list-state';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useContactRemove } from '@/features/contact';
import { pendingNotify } from '@/shared/lib/notifications/pending';
import { successNotify } from '@/shared/lib/notifications/success';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';

export const ContactsList = () => {
  const selectUser = useSetUuidForRouter();
  const { contacts, count, contactsMap } = useContactListState();
  const { mutate: removeContact } = useContactRemove();
  if (contacts.isLoading) {
    return (
      <>
        <SkeletonContactItem size={60} />
        <SkeletonContactItem size={60} />
        <SkeletonContactItem size={60} />
      </>
    );
  }
  if (contacts.isError) {
    return (
      <Alert icon={<Ban />} color="red">
        Произошла непридвиденая ошибка загрузки контактов. Перзагрузите
        страницу.
      </Alert>
    );
  }
  if (!count.data) {
    return (
      <Alert color="blue" icon={<CircleSlash />}>
        У вас еще нет контактов. Добавьте их через поиск.
      </Alert>
    );
  }
  return (
    <VirtualList<typeof contactsMap>
      count={count.data}
      data={contactsMap}
      overscan={10}
      esimateSize={() => 92}
      isFetchingNextPage={contacts.isFetchingNextPage}
      dataSelect={(c, i) => c[i]}
      fetchFunction={contacts.fetchNextPage}
      fallback={(size) => <SkeletonContactItem size={size} />}
      hasNextPage={contacts.hasNextPage}
      render={(c) => (
        <ContactItem
          user={c}
          onRemove={(user_id) => {
            pendingNotify('Удаление...');
            removeContact(
              {
                body: { user_id },
              },
              {
                onSuccess() {
                  successNotify(
                    `Контакт ${c.login ?? c.custom_name ?? c.full_name ?? ''} удалён`
                  );
                },
              }
            );
          }}
          onClick={() => {
            void selectUser(c.user_id);
            layoutAction.doSetAside(true);
          }}
        />
      )}
    />
  );
};
