import { useSearch } from '../api';
import { Loader, TextInput, type TextInputProps } from '@mantine/core';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from 'react-use';

export const SearchInput = ({ ...props }: TextInputProps) => {
  const { setQuery, isLoading } = useSearch();
  const [value, setValue] = useState('');
  useDebounce(
    () => {
      setQuery(value);
    },
    500,
    [value]
  );
  return (
    <TextInput
      {...props}
      radius={'xl'}
      leftSection={<Search />}
      value={value}
      rightSection={isLoading && <Loader size="xs" />}
      onChange={({ currentTarget }) => {
        setValue(currentTarget.value);
      }}
    />
  );
};
