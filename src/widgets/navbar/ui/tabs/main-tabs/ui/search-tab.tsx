import { Stack } from '@mantine/core';
import { SearchResultList } from '@/features/search';
import { SearchHistoryList } from '@/features/search-history/index.ts';

interface SearchTabContentProps {
  onClickHistoryItem: (value: string) => void;
}

export const SearchTabContent = ({
  onClickHistoryItem,
}: SearchTabContentProps) => {
  return (
    <Stack gap="xs">
      <SearchHistoryList
        onClickItem={(value) => {
          onClickHistoryItem(value);
        }}
      />
      <SearchResultList />
    </Stack>
  );
};
