import { ProfileDataDisplaySearch, SkeletonProfile } from '@/entities/user';
import { UpdateContactForm } from '@/features/contactUpdate';
import { useEmblaApi } from '@/shared/lib/hooks/useEmbalaApi';
import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { Carousel } from '@mantine/carousel';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { asideLoaderHooks } from '../model/loader-store';
import { userAction } from '@/entities/user/model/userStore';
import { selectedUserActions } from '@/shared/model/stores/selected-user';

export const AssideProfile = () => {
  const user = selectedUserActions.doGetUser();
  const isMe = userAction.doIsThatMe(user?.user_id ?? '');
  const loader = asideLoaderHooks.useLoad();
  const [setEmbla, { next }] = useEmblaApi();

  if (user === null) return;
  console.debug('User selected', user);
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
            uuid={uuid}
          />
        </Carousel.Slide>
      </Carousel>
    </AppShellAside>
  );
};
