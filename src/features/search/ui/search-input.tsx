import { useSearch } from '../api';
import { Loader, TextInput, type TextInputProps } from '@mantine/core';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { historySearchActions } from '@/features/search-history';
import { useSearchUserQuery } from '../api/use-search';

interface SaerchInputProps extends TextInputProps {
  onCommit?: (v: string) => void;
}
export const SearchInput = ({ onCommit, ...props }: SaerchInputProps) => {
  const { isLoading } = useSearch();
  const query = useSearchUserQuery((s) => s.data);
  const [value, setValue] = useState<string>(query);
  useDebounce(
    () => {
      if (!(value.length > 2)) return;
      onCommit?.(value);
      useSearchUserQuery.setState({ data: value });
      historySearchActions.doPush(value);
    },
    1000,
    [value]
  );
  useEffect(() => {
    setValue(query);
  }, [query]);
  return (
    <TextInput
      {...props}
      radius={'xl'}
      leftSection={<Search />}
      defaultValue={query}
      value={value}
      rightSection={isLoading && <Loader size="xs" />}
      onChange={({ currentTarget }) => {
        setValue(currentTarget.value);
      }}
    />
  );
};
