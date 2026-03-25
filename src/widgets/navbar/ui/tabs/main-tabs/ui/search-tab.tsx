import { Box, Stack } from '@mantine/core';
import { SearchResultList } from '@/features/search';
import { SearchHistoryList } from '@/features/search-history/index.ts';

interface SearchTabContentProps {
  onClickHistoryItem: (value: string) => void;
}

export const SearchTabContent = ({
  onClickHistoryItem,
}: SearchTabContentProps) => {
  return (
    <Stack gap="xs" h="100%" style={{ minHeight: 0 }}>
      <SearchHistoryList
        onClickItem={(value) => {
          onClickHistoryItem(value);
        }}
      />
      <Box flex={1} mih={0}>
        <SearchResultList />
      </Box>
    </Stack>
  );
};
