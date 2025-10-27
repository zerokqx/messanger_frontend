import { useSearch, useSearchStore } from '@/features/search';
import { useAuth } from '@/shared/model/authProviderContext';
import { CustomMantineInput } from '@/shared/ui/Input';
import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
import { useBorder } from '@/widgets/Settings';
import {
  Burger,
  Flex,
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
  const { prevTab } = useStore();
  const currentTab = useStore.useCurrentTab();
  useSearch();

  useLogger('Active Tab', { currentTab, prevTab });
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
        <Taber.GoToButton label="Выйти" resetTo="chats" />
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
      <CustomMantineInput
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
        radius="xl"
        w={'100%'}
        {...input}
      />
    </Flex>
  );
};
