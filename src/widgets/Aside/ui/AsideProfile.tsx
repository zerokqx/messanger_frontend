import {
  ProfileDataDisplaySearch,
  SkeletonProfile,
  useIsThatMe,
} from '@/entities/user';
import { UpdateContactForm } from '@/features/contactUpdate';
import { useEmblaApi } from '@/shared/lib/hooks/useEmbalaApi';
import { useCombinedSelectSearch } from '@/widgets/ChatAside/model/useSearchUnion';
import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { Carousel } from '@mantine/carousel';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { asideLoaderHooks, useAsideLoader } from '../model/loader-store';

export const AssideProfile = () => {
  const user = useCombinedSelectSearch('selectedUser', (s) => s);
  const uuid = useCombinedSelectSearch('selectedUser', (s) => s?.user_id);
  const isMe = useIsThatMe(uuid);
  const loader = asideLoaderHooks.useLoad();
  const [setEmbla, { next }] = useEmblaApi();
  return (
    <AppShellAside zIndex={10000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      <Carousel getEmblaApi={setEmbla} withControls={false}>
        <Carousel.Slide>
          {loader ? (
            <SkeletonProfile />
          ) : (
            <ProfileDataDisplaySearch {...user} />
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
              custom_name: user.profile.login,
            }}
            uuid={uuid}
          />
        </Carousel.Slide>
      </Carousel>
    </AppShellAside>
  );
};
