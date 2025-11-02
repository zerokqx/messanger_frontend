import { useSearch, useSearchStore } from '@/features/search';
import { useAuth } from '@/shared/model/authProviderContext';
import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
import { useBorder } from '@/widgets/Settings';
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
import { useLogger } from 'react-use';
import { assideTaber } from '../lib/tab';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const isOpen = useSideBarStore.useIsOpen();
  const toggle = useSideBarStore.useToggle();
  const t = useMantineTheme();
  const isAuth = useAuth((s) => s.isAuth);
  const bd = useBorder('0.1rem');
  const timer = useRef<number | null>(null);

  const setQuery = useSearchStore((s) => s.setQuery);
  const [Taber, useStore] = assideTaber;
  const goBack = useStore.useGoBack();
  const set = useStore.useSetCurrentTab();
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
      style={{
        borderBottom: bd,
      }}
    >
      <Taber.OnlyOnTab on="search">
        <CloseButton onClick={goBack} />
      </Taber.OnlyOnTab>
      <Taber.OnlyOnTab on="chats">
        <Burger
          size={'md'}
          opened={isOpen}
          onClick={toggle}
          color="blue"
          aria-label="Toggle SideBar"
        />
      </Taber.OnlyOnTab>
      <TextInput
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
