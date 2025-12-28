import { SearchInput } from '@/shared/ui/SearchInput';
import { useSearch } from '../api';
import { Loader, type TextInputProps } from '@mantine/core';

export const SearchInputWrapper = ({ ...props }: TextInputProps) => {
  const { setQuery, isLoading } = useSearch();
  return (
    <SearchInput
      {...props}
      bdrs={'xl'}
      rightSection={isLoading && <Loader pr={'xs'} type="dots" size={'md'} />}
      action={(value) => {
        setQuery(value);
      }}
    />
  );
};
