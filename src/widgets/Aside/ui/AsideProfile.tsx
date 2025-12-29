import { ProfileDataDisplaySearch } from '@/entities/user';
import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { userAction } from '@/entities/user/model/userStore';
import {
  useSelectedUser,
  type IUserProfile,
} from '@/shared/model/stores/selected-user';
import { useShallow } from 'zustand/shallow';
import Logger from '@/shared/lib/logger/logger';

export const AssideProfile = () => {
  const user = useSelectedUser(
    useShallow((s) => s.data.user?.profile)
  ) as IUserProfile;
  const isMe = userAction.doIsThatMe(user?.user_id ?? '');
  // const [setEmbla, { next }] = useEmblaApi();

  Logger.info('AsideProfile', 'profile user', user);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {user && (
        <>
          <ProfileDataDisplaySearch user={user} />
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
