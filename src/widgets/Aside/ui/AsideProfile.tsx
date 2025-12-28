import { ProfileDataDisplaySearch, SkeletonProfile } from '@/entities/user';
import { UpdateContactForm } from '@/features/contactUpdate';
import { useEmblaApi } from '@/shared/lib/hooks/useEmbalaApi';
import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { Carousel } from '@mantine/carousel';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { asideLoaderHooks } from '../model/loader-store';
import { userAction } from '@/entities/user/model/userStore';
import {
  useSelectedUser,
  type IUserProfile,
} from '@/shared/model/stores/selected-user';
import Logger from '@/shared/lib/logger/logger';

export const AssideProfile = () => {
  const user = useSelectedUser((s) => s.data.user?.profile) as IUserProfile;
  const isMe = userAction.doIsThatMe(user?.user_id ?? '');
  const loader = asideLoaderHooks.useLoad();
  const [setEmbla, { next }] = useEmblaApi();

  Logger.info('AsideProfile', 'profile user', user);
  if (!user) return;
  return (
    <AppShellAside zIndex={10000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      <Carousel getEmblaApi={setEmbla} withControls={false}>
        <Carousel.Slide>
          {loader ? (
            <SkeletonProfile />
          ) : (
            <ProfileDataDisplaySearch user={user} />
          )}
          {!isMe && (
            <>
              <Space h={'1rem'} />
              <SelectedProfileButtonAction renameProps={{ onClick: next }} />
            </>
          )}
        </Carousel.Slide>
        <Carousel.Slide>
          <UpdateContactForm
            initialState={{
              custom_name: user.login,
            }}
            uuid={user.user_id}
          />
        </Carousel.Slide>
      </Carousel>
    </AppShellAside>
  );
};
