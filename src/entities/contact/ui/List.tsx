import { VirtualList } from '@/shared/ui/VirtualList/ui/VirtualList';
import { Skeleton, Group, Alert, Loader, Center } from '@mantine/core';
import { ContactItem } from './ContactItem';
import { useGetUserById } from '@/features/getUserById';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { useEffect } from 'react';
import { useContactCountQuery, useContactsQuery } from '../api';
import { pagesMap } from '../lib/pagesMap';
import { useLogger } from '@mantine/hooks';
import Logger from '@/shared/lib/logger/logger';
import { Ban, CircleSlash } from 'lucide-react';
import { useSelectedSearchUser } from '@/features/selected-user';
import { toPlainProfile } from '@/entities/user';
import { SkeletonContactItem } from './SkeletonContactItem';

export const List = () => {
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

  const selectedUpdate = useSelectedSearchUser((s) => s.update);
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
      selectedUpdate((s) => {
        s.user = toPlainProfile(data);
      });
    }
  }, [data, dataUpdatedAt, selectedUpdate]);

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
