import { VirtualList } from '@/shared/ui/VirtualList/ui/VirtualList';
import { Skeleton, Group, Alert } from '@mantine/core';
import { ContactElement } from './ContactItem';
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

export const List = () => {
  const {
    data: pages,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    isFetchingNextPage,
  } = useContactsQuery(10);

  const contacts = pagesMap(pages);
  const { data: count } = useContactCountQuery();

  const selectedUpdate = useSelectedSearchUser((s) => s.update);
  const layout = useLayoutStore((s) => s.update);
  const { data, setId, isFetching, dataUpdatedAt } = useGetUserById();

  useEffect(() => {
    if (dataUpdatedAt && data) {
      Logger.debug('List', 'effect select user', data);
      selectedUpdate((s) => {
        s.user = toPlainProfile(data);
      });
    }
  }, [data, dataUpdatedAt]);

  useLogger('List', [pages]);
  useEffect(() => {
    if (isFetching) layout((s) => (s.asside = true));
  }, [isFetching, layout]);

  if (isError) {
    return (
      <Alert icon={<Ban />} color="red">
        Произошла непридвиденая ошибка загрузки контактов. Перзагрузите
        страницу.
      </Alert>
    );
  }
  return count ? (
    <VirtualList<typeof contacts>
      count={count}
      data={contacts}
      overscan={10}
      esimateSize={() => 50}
      isFetchingNextPage={isFetchingNextPage}
      dataSelect={(c, i) => c[i]}
      fetchFunction={fetchNextPage}
      fallback={(size) => (
        <Group h={size} align="center" justify="space-between" w={'100%'}>
          <Group align="flex-start">
            <Skeleton circle h={40} w={40} />
            <Skeleton h={10} w={100} />
          </Group>
          <Skeleton h={30} w={30} bdrs={'xl'} />
        </Group>
      )}
      hasNextPage={hasNextPage}
      render={(c) => (
        <ContactElement
          user={c}
          onClick={() => {
            setId(c.user_id);
          }}
        />
      )}
    />
  ) : (
    <Alert color="blue" icon={<CircleSlash />}>
      У вас еще нет контактов. Добавьте их через поиск
    </Alert>
  );
};
