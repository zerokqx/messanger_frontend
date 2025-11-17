import { ProfileDataDisplay } from '@/entities/user';
import type { components, paths } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AppShellTaber } from '../../lib/tab';
import {
  ActionIcon,
  Avatar,
  Button,
  Grid,
  Group,
  Menu,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import { useState } from 'react';
import { useLogger } from 'react-use';

export const SelectProfileTab = () => {
  const path: keyof paths = '/user/search' as const;
  const { uuid, query } = useSearch({ from: '/_authorized/y' });
  const [opened, setOpened] = useState(false);
  const users = useQueryClient().getQueryData<
    components['schemas']['UserSearchResponse']
  >([
    'get',
    path,
    {
      params: {
        query: { query },
      },
    },
  ]);
  useLogger('menu', [opened]);

  const profile = users?.data.users.find((user) => {
    return user.user_id === uuid;
  })?.profile as components['schemas']['ProfileByUserIdData'] | null;

  const bio = profile?.bio ?? '';
  const full_name = profile?.full_name ?? '';
  const login = profile?.login ?? 'Anonymous';
  const rating = profile?.rating.rating ?? 0;
  return (
    <AppShellTaber.Panel value="profile">
      <ProfileDataDisplay {...{ bio, login, fullName: full_name, rating }} />
      <Stack>
        <Button w={'100%'}>Добавить в контакты</Button>

        <Group>
          <Button fullWidth>Добавить в контакты</Button>

          <Button fullWidth variant="light" color={'red'}>
            Удалить
          </Button>
        </Group>
      </Stack>
    </AppShellTaber.Panel>
  );
};
