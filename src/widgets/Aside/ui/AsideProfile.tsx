import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { userAction } from '@/entities/user/model/userStore';
import Logger from '@/shared/lib/logger/logger';
import { useSelectedSearchUser } from '@/features/selected-user';
import { ProfileFromSearchUser } from '@/entities/user/ui/ProfileFromSearchUser';
import type { components } from '@/shared/types/v1';

export const AssideProfile = () => {
  const profile = useSelectedSearchUser((s) => s.data.user?.profile) as
    | components['schemas']['ProfileByUserIdData']
    | undefined;
  const isMe = userAction.doIsThatMe(profile?.user_id ?? '');
  // const [setEmbla, { next }] = useEmblaApi();

  Logger.info('AsideProfile', 'profile user', profile);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {profile && (
        <>
          <ProfileFromSearchUser profile={profile} />
          {!isMe && (
            <>
              <Space h={'1rem'} />
              <SelectedProfileButtonAction />
            </>
          )}
        </>
      )}
    </AppShellAside>
  );
};
