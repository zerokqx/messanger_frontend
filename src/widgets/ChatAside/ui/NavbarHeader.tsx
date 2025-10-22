import { useBorder } from '@/shared/lib/hooks/settings';
import { CustomMantineInput } from '@/shared/ui/Input';
import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
import { Flex, Burger, useMantineTheme } from '@mantine/core';
import { Search } from 'lucide-react';

export const NavbarHeader = () => {
  const { isOpen, toggle } = useSideBarStore();
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');

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
        leftSection={<Search />}
        placeholder="Поиск"
        radius="xl"
        w={'100%'}
      />
    </Flex>
  );
};
