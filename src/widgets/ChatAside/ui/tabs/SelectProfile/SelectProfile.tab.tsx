import { ProfileDataDisplay, useIsThatMe } from '@/entities/user';
import { AppShellTaber } from '@/widgets/ChatAside/lib/tab';
import { SelectedProfileButtonAction } from './ButtonsAction';
import type { TUserState } from '@/entities/user/types/userStore.type';
import { useCombinedSelectSearch } from '@/widgets/ChatAside/model/useSearchUnion';
import { Badge, Group, Text } from '@mantine/core';
import { Star } from 'lucide-react';
import { useLogger } from '@mantine/hooks';

export const SelectProfileTab = () => {
  const profile = useCombinedSelectSearch(
    'selectedUser',
    (s) => s.profile
  ) as TUserState;
  const uuid = useCombinedSelectSearch('selectedUser', (s) => s.user_id);
  const isMe = useIsThatMe(uuid);
  const bio = profile.bio ?? '';
  const full_name = profile.full_name ?? '';
  const login = profile.login || 'Anonymous';
  const rating = profile.rating.rating ?? 0;
  useLogger('selected user', [profile]);
  return (
    <AppShellTaber.Panel value="profile">
      {isMe && (
        <Badge>
          <Group gap={'xs'}>
            <Star size={16} />
            Is that me
          </Group>
        </Badge>
      )}
      <ProfileDataDisplay {...{ bio, login, fullName: full_name, rating }} />
      {!isMe && <SelectedProfileButtonAction />}
    </AppShellTaber.Panel>
  );
};
