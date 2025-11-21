import { ProfileDataDisplaySearch, useIsThatMe } from '@/entities/user';
import { UpdateContactForm } from '@/features/contactUpdate';
import { useEmblaApi } from '@/shared/lib/hooks/useEmbalaApi';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { useCombinedSelectSearch } from '@/widgets/ChatAside/model/useSearchUnion';
import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { Carousel } from '@mantine/carousel';
import {
  AppShellAside,
  Badge,
  Box,
  CloseButton,
  Group,
  Space,
} from '@mantine/core';
import { AsideHaeader } from './Header';

export const AssideProfile = () => {
  const user = useCombinedSelectSearch('selectedUser', (s) => s);
  const uuid = useCombinedSelectSearch('selectedUser', (s) => s.user_id);
  const isMe = useIsThatMe(uuid);
  const [setEmbla, { next }] = useEmblaApi();
  const close = useLayoutStore((s) => s.update);
  return (
    <AppShellAside style={{ overflow: 'clip' }}>
      <Box>
        <AsideHaeader />
        <Carousel getEmblaApi={setEmbla} withControls={false}>
          <Carousel.Slide>
            <ProfileDataDisplaySearch {...user} />
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
      </Box>
    </AppShellAside>
  );
};
