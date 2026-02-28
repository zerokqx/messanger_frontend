import { Button, Center, Collapse, Group, Stack, Text } from '@mantine/core';
import { historySearchActions, useHistorySearch } from '../model';
import { HistoryItem, type SearchHistoryItemPorps } from './history-item.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { m } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchHistoryListProps {
  onClickItem?: SearchHistoryItemPorps['onClick'];
}
export const SearchHistoryList = ({ onClickItem }: SearchHistoryListProps) => {
  const { t } = useTranslation('search');
  const latestRequests = useHistorySearch((state) => state.data);
  const [collapseVisibility, setCollapseVisibility] = useState(false);
  const isOpen = collapseVisibility;
  const timeOutRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timeOutRef.current !== null) clearTimeout(timeOutRef.current);
    };
  }, []);
  return (
    <Stack>
      <Group justify="space-between">
        <Button
          variant="transparent"
          size="compact-xs"
          color="gray"
          rightSection={collapseVisibility ? <ChevronUp /> : <ChevronDown />}
          onClick={() => {
            setCollapseVisibility((prev) => !prev);
          }}
        >
          {t('history')}
        </Button>
        <Button
          variant="transparent"
          disabled={!latestRequests.length}
          color={'red'}
          size="compact-xs"
          onClick={() => {
            if (timeOutRef.current !== null) clearTimeout(timeOutRef.current);
            historySearchActions.doClear();
            setCollapseVisibility(true);
            timeOutRef.current = setTimeout(() => {
              setCollapseVisibility(false);
            }, 1000);
          }}
        >
          {t('clear-history')}
        </Button>
      </Group>
      <Collapse
        mah={'200px'}
        style={{ overflow: 'auto' }}
        in={isOpen}
        keepMounted
      >
        {!latestRequests.length && (
          <Center>
            <Text opacity={0.7}>{t('history-empty')}</Text>
          </Center>
        )}
        {latestRequests.map((request) => (
          <m.div
            key={request}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <HistoryItem onClick={onClickItem} key={request}>
              {request}
            </HistoryItem>
          </m.div>
        ))}
      </Collapse>
    </Stack>
  );
};
