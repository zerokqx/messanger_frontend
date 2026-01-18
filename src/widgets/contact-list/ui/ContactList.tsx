import { VirtualList } from '@/shared/ui/VirtualList/ui/VirtualList';
import { Alert } from '@mantine/core';
import { useGetUserById } from '@/features/getUserById';
import { Ban, CircleSlash } from 'lucide-react';
import { ContactItem, SkeletonContactItem } from '@/entities/contact';
import { useContactListState } from '../model/useContactListState';
import { useGetUserByIdEffects } from '../model/useGetUserByIdEffects';

export const ContactsList = () => {
  const { contacts, count, contactsMap } = useContactListState();
  const getUserById = useGetUserById();
  useGetUserByIdEffects(getUserById);

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
  if (contacts.data && contacts.data.pages.length === 0) {
    return (
      <Alert color="blue" icon={<CircleSlash />}>
        У вас еще нет контактов. Добавьте их через поиск.
      </Alert>
    );
  }
  return (
    <VirtualList<typeof contactsMap>
      count={count.data ?? 10}
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
          onClick={() => {
            getUserById.abortPrevious();
            getUserById.setId(c.user_id);
          }}
        />
      )}
    />
  );
};
