import { useSearch } from '@/features/search';
import { CustomMantineInput } from '@/shared/ui/Input';
import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
import { useBorder } from '@/widgets/Settings';
import { Flex, Burger, useMantineTheme } from '@mantine/core';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

export const NavbarHeader = () => {
  const { isOpen, toggle } = useSideBarStore();
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  const timer = useRef<number | null>(null);
  const [query, setQuery] = useState('');
  useSearch(query);
  return (
    <Flex
      bg={t.black}
      gap={'md'}
      p={'md'}
      justify={'flex-start'}
      w={'100%'}
      align={'center'}
      style={{
        borderBottom: bd,
      }}
    >
      <Burger
        size={'md'}
        opened={isOpen}
        onClick={toggle}
        color="blue"
        aria-label="Toggle SideBar"
      />
      <CustomMantineInput
        onChange={(e) => {
          if (timer.current) timer.current = null;
          timer.current = setTimeout(() => {
            setQuery(e.target.value);
          }, 2000);
          return timer;
        }}
        leftSection={<Search />}
        placeholder="Поиск"
        radius="xl"
        w={'100%'}
      />
    </Flex>
  );
};
