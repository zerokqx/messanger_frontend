import { useSearch, useSearchStore } from '@/features/search';
import { useAuth } from '@/shared/model/authProviderContext';
import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
import {
  Burger,
  CloseButton,
  Grid,
  Group,
  Loader,
  TextInput,
  useMantineTheme,
  type TextInputProps,
} from '@mantine/core';
import { Search } from 'lucide-react';
import { useRef } from 'react';
import { appShellReset, AppShellTaber, useTabAppShell } from '../lib/tab';
import { Else, Fallback, If, Then } from 'react-if';
import { SearchInput } from '@/shared/ui/SearchInput';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const isOpen = useSideBarStore.useIsOpen();
  const toggle = useSideBarStore.useToggle();
  const isAuth = useAuth((s) => s.isAuth);
  const timer = useRef<number | null>(null);

  const setQuery = useSearchStore((s) => s.setQuery);
  const goBack = useTabAppShell.useGoBack();
  const set = useTabAppShell.useSetCurrentTab();
  const currentTab = useTabAppShell.useCurrentTab();

  const searcher = useSearch();
  return (
    <Grid p={'md'} align="center">
      <Grid.Col span={'content'}>
        <If condition={currentTab !== appShellReset()}>
          <Then>
            <CloseButton onClick={goBack} />
          </Then>
          <Else>
            <AppShellTaber.OnlyOnTab on={appShellReset()}>
              <Burger
                size={'md'}
                opened={isOpen}
                onClick={toggle}
                color="blue"
                aria-label="Toggle SideBar"
              />
            </AppShellTaber.OnlyOnTab>
          </Else>
        </If>
      </Grid.Col>
      <Grid.Col span={'auto'}>
        <SearchInput
          rightSection={
            searcher.isLoading && <Loader pr={'xs'} type="dots" size={'md'} />
          }
          onFocus={() => set('search')}
          action={(e) => setQuery(e.target.value)}
        />
      </Grid.Col>
    </Grid>
  );
};
