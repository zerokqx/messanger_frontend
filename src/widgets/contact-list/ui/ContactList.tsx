import { VirtualList } from '@/shared/ui/VirtualList/ui/VirtualList';
import { Alert } from '@mantine/core';
import { useGetUserById } from '@/features/getUserById';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { useEffect } from 'react';
import { useLogger } from '@mantine/hooks';
import Logger from '@/shared/lib/logger/logger';
import { Ban, CircleSlash } from 'lucide-react';
import { useSelectedSearchUser } from '@/features/selected-user';
import { toPlainProfile } from '@/entities/user';
import {
  ContactItem,
  pagesMap,
  SkeletonContactItem,
  useContactCountQuery,
  useContactsQuery,
} from '@/entities/contact';
import { asideBusActions } from '@/features/aside/model/aside-bus';
import { ASIDE_BUS_EVENTS } from '@/features/aside';

export const ContactsList = () => {
  const {
    data: pages,
    hasNextPage,
    fetchNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useContactsQuery(10);
  const contacts = pagesMap(pages);
  const { data: count } = useContactCountQuery();
  const layout = useLayoutStore((s) => s.update);
  const {
    data,
    setId,
    isFetching: isFetchingUserById,
    dataUpdatedAt,
  } = useGetUserById();

  useEffect(() => {
    if (dataUpdatedAt && data) {
      Logger.debug('List', 'effect select user', data);
      asideBusActions.doNewCommand({
        type: ASIDE_BUS_EVENTS.USER_CONTACT,
        data: data,
      });
    }
  }, [data, dataUpdatedAt]);

  useLogger('List', [pages]);
  useEffect(() => {
    if (isFetchingUserById) layout((s) => (s.asside = true));
  }, [isFetchingUserById, layout]);

  if (isLoading) {
    return (
      <>
        <SkeletonContactItem size={60} />
        <SkeletonContactItem size={60} />
        <SkeletonContactItem size={60} />
      </>
    );
  }
  if (isError) {
    return (
      <Alert icon={<Ban />} color="red">
        Произошла непридвиденая ошибка загрузки контактов. Перзагрузите
        страницу.
      </Alert>
    );
  }
  if (pages && pages.pages.length === 0) {
    return (
      <Alert color="blue" icon={<CircleSlash />}>
        У вас еще нет контактов. Добавьте их через поиск.
      </Alert>
    );
  }
  return (
    <VirtualList<typeof contacts>
      count={count ?? 10}
      data={contacts}
      overscan={10}
      esimateSize={() => 92}
      isFetchingNextPage={isFetchingNextPage}
      dataSelect={(c, i) => c[i]}
      fetchFunction={fetchNextPage}
      fallback={(size) => <SkeletonContactItem size={size} />}
      hasNextPage={hasNextPage}
      render={(c) => (
        <ContactItem
          user={c}
          onClick={() => {
            setId(c.user_id);
          }}
        />
      )}
    />
  );
};
