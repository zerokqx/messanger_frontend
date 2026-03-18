import * as m from 'motion/react-m';
import {
  ActionIcon,
  Checkbox,
  Chip,
  Group,
  Paper,
  Stack,
  TextInput,
} from '@mantine/core';
import { ChevronsDown, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AchievementBadgeType, AchievementFiltersProps } from './types';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
const BADGE_ORDER: AchievementBadgeType[] = [
  'bronze',
  'silver',
  'gold',
  'platinum',
  'diamond',
  'legendary',
];

export const AchievementFilters = ({
  selectedGrades,
  onSelectedGradesChange,
  search,
  onSearchChange,
  showCompleted,
  onShowCompletedChange,
  showInProgress,
  onShowInProgressChange,
  onClear,
}: AchievementFiltersProps) => {
  const [t] = useTranslation('achievement');
  const [openMoreFilters, setOpenMoreFilters] = useState(false);

  return (
    <Stack gap={6} w="100%" p="xs">
      <AnimatePresence initial={false}>
        {openMoreFilters && (
          <m.div
            key="more-filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <Paper withBorder radius="md" p="xs">
              <Stack gap="xs">
                <Group wrap="nowrap" align="flex-start" w="100%">
                  <TextInput
                    value={search}
                    onChange={(event) => {
                      onSearchChange(event.currentTarget.value);
                    }}
                    placeholder={t('search_placeholder')}
                    size="xs"
                    flex={1}
                  />
                  <ActionIcon
                    onClick={onClear}
                    aria-label={t('clear_filters')}
                    disabled={
                      search.length === 0 &&
                      selectedGrades.length === 0 &&
                      showCompleted &&
                      showInProgress
                    }
                  >
                    <X size={16} />
                  </ActionIcon>
                </Group>

                <Chip.Group
                  multiple
                  value={selectedGrades}
                  onChange={(values) => {
                    onSelectedGradesChange(values as AchievementBadgeType[]);
                  }}
                >
                  <Group gap={6}>
                    {BADGE_ORDER.map((badgeType) => (
                      <Chip key={badgeType} value={badgeType} size="xs">
                        {t(`badge.${badgeType}`)}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </Stack>
            </Paper>
          </m.div>
        )}
      </AnimatePresence>
      <Paper withBorder radius="md" p="xs">
        <Group gap="md" wrap='nowrap' justify="space-between">
          <Group wrap='wrap'>
            <Checkbox
              label={t('status.completed')}
              checked={showCompleted}
              onChange={(event) => {
                onShowCompletedChange(event.currentTarget.checked);
              }}
              size="xs"
            />
            <Checkbox
              label={t('status.in_progress')}
              checked={showInProgress}
              onChange={(event) => {
                onShowInProgressChange(event.currentTarget.checked);
              }}
              size="xs"
            />
          </Group>

          <ActionIcon
            onClick={() => {
              setOpenMoreFilters((prev) => !prev);
            }}
            variant="light"
          >
            <ChevronsDown />
          </ActionIcon>
        </Group>
      </Paper>
    </Stack>
  );
};
