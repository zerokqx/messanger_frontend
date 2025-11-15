import { useRef, type ChangeEvent, type ComponentProps } from 'react';
import { Search } from 'lucide-react';
import type { SearchInputProp } from '../types/searchInput.type';
import { TextInput } from '@mantine/core';

export const SearchInput = ({ action, ...props }: SearchInputProp) => {
  const timer = useRef<number | null>(null);
  return (
    <TextInput
      onChange={(e) => {
        if (timer.current) timer.current = null;
        timer.current = setTimeout(() => {
          action(e);
        }, 200);
        return timer;
      }}
      leftSection={<Search />}
      placeholder="Поиск"
      {...props}
    />
  );
};
