import { Skeleton, Group, Button, Box } from '@mantine/core';
import {
  useContactsCountFetch,
  useContactsListFetch,
} from '@/entities/contact';
import { SideBarTaber } from '../../model/tab';
import { VirtualList } from '@/shared/ui/VirtualList/ui/VirtualList';
import { useCSContactsList } from '@/entities/contact/model/useContactsList';
import { ContactElement } from '@/features/contact';
import { useEffect, useRef } from 'react';
import { useSelectedUser } from '@/widgets/ChatAside/model/useSelectedUser';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { useGetUserById } from '@/features/getUserById';
import { useUserStore } from '@/entities/user';
import {
  asideLoaderActions,
  useAsideLoader,
} from '@/widgets/Aside/model/loader-store';
export const ContactsTab = () => {
  const {
    data: pages,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useContactsListFetch(10);

  const ref = useRef<HTMLDivElement>(null);
  const contacts = pages?.pages.flatMap((page) => page.data.items) ?? [];
  const { isLoading, data: count } = useContactsCountFetch();

  const selectUser = useSelectedUser((s) => s.update);
  const resetSelectUser = useSelectedUser((s) => s.reset);
  const layout = useLayoutStore((s) => s.update);
  const c = useCSContactsList(pages).users;
  const uuidSelected = useSelectedUser((s) => s.data.user_id);
  const { data, mutateAsync } = useGetUserById();
  return (
    <SideBarTaber.Panel value="contacts">
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
              void (async () => {
                await mutateAsync({
                  params: {
                    path: {
                      user_id: c.user_id,
                    },
                  },
                });

                if (data) {
                  selectUser((s) => {
                    s.profile = data.data;
                  });
                  layout((s) => (s.asside = true));
                }
              })();
            }}
          />
        )}
      />
    </SideBarTaber.Panel>
  );
};
