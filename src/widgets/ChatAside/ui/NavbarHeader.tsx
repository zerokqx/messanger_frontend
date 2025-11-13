import { useSearch, useSearchStore } from '@/features/search';
import { useAuth } from '@/shared/model/authProviderContext';
import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
import {
  Burger,
  CloseButton,
  Flex,
  TextInput,
  useMantineTheme,
  type TextInputProps,
} from '@mantine/core';
import { Search } from 'lucide-react';
import { useRef } from 'react';
import { appShellReset, AppShellTaber, useTabAppShell } from '../lib/tab';
import { current } from 'immer';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const isOpen = useSideBarStore.useIsOpen();
  const toggle = useSideBarStore.useToggle();
  const t = useMantineTheme();
  const isAuth = useAuth((s) => s.isAuth);
  const timer = useRef<number | null>(null);

  const setQuery = useSearchStore((s) => s.setQuery);
  const goBack = useTabAppShell.useGoBack();
  const set = useTabAppShell.useSetCurrentTab();
  const currentTab = useTabAppShell.useCurrentTab();

  useSearch();
  return (
    <Flex
      bg={t.black}
      gap={'md'}
      p={'md'}
      justify={'center'}
      direction={'row'}
      w={'100%'}
      align={'center'}
    >
      {currentTab !== appShellReset() && <CloseButton onClick={goBack} />}
      <AppShellTaber.OnlyOnTab on="chats">
        <Burger
          size={'md'}
          opened={isOpen}
          onClick={toggle}
          color="blue"
          aria-label="Toggle SideBar"
        />
      </AppShellTaber.OnlyOnTab>
      <TextInput
        onDragStartCapture={() => {
          set('search');
        }}
        disabled={!isAuth}
        onChange={(e) => {
          if (timer.current) timer.current = null;
          timer.current = setTimeout(() => {
            setQuery(e.target.value);
          }, 200);
          return timer;
        }}
        leftSection={<Search />}
        placeholder="Поиск"
        w={'100%'}
        {...input}
      />
    </Flex>
  );
};
