import { VirtualList } from '@/shared/ui/VirtualList/ui/VirtualList';
import { Skeleton, Group } from '@mantine/core';
import { ContactElement } from './ContactItem';
import { useGetUserById } from '@/features/getUserById';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { useEffect } from 'react';
import { useContactCountQuery, useContactsQuery } from '../api';
import { pagesMap } from '../lib/pagesMap';
import { selectedUserActions } from '@/shared/model/stores/selected-user';

export const List = () => {
  const {
    data: pages,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useContactsQuery(10);

  const contacts = pagesMap(pages);
  const { data: count } = useContactCountQuery();

  const layout = useLayoutStore((s) => s.update);
  const { data, setId, isSuccess } = useGetUserById();
  useEffect(() => {
    if (isSuccess) {
      selectedUserActions.doSelect(data);
      layout((s) => (s.asside = true));
    }
  }, [data, isSuccess, layout]);
  return (
    <VirtualList<typeof contacts>
      count={count ?? 0}
      data={contacts}
      overscan={10}
      esimateSize={() => 50}
      isFetchingNextPage={isFetchingNextPage}
      dataSelect={(c, i) => c[i]}
      fetchFunction={fetchNextPage}
      fallback={(size) => (
        <Group h={size} align="center" justify="space-between" w={'100%'}>
          <Group align="flex-start">
            <Skeleton circle h={40} w={40} animate />
            <Skeleton animate h={10} w={100} />
          </Group>
          <Skeleton animate h={30} w={30} bdrs={'xl'} />
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
  );
};
