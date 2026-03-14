import { Alert, Box, Center, Pagination, Text } from '@mantine/core';
import { CircleSlash } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import * as m from 'motion/react-m';
import { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';
import { useMyAchievement } from '../api';
import { AchievementCard } from './achievement-card';
import { AchievementFilters } from './achievement-filters';
import type { AchievementItem } from './types';
import { useAchievementsGridState } from './use-achievements-grid-state';
import { AnimatePresence } from 'motion/react';
import { createThrottledVibrationHandler } from '@/shared/lib/vibration';
import { useResponsive } from '@/shared/lib/hooks/use-responsive';

const PAGE_SIZE = 10;

const VirtuosoList = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} style={{ ...props.style, paddingBottom: '8px' }} />;
};

const normalizeAchievement = (
  item: Partial<AchievementItem>
): AchievementItem => ({
  achievement_id: item.achievement_id ?? 0,
  code: item.code ?? '',
  name: item.name ?? 'Unknown achievement',
  description: item.description ?? '',
  icon: item.icon ?? '',
  category: item.category ?? 'general',
  badge_type: item.badge_type ?? 'bronze',
  is_completed: item.is_completed ?? false,
  unlocked_at: item.unlocked_at ?? null,
  progress: item.progress ?? 0,
  required_progress: item.required_progress ?? 0,
});

const flattenAchievements = (
  items: Record<string, Partial<AchievementItem>[] | undefined> | undefined
): AchievementItem[] => {
  if (!items) return [];
  return Object.values(items).flatMap((group) =>
    (group ?? []).map((achievement) => normalizeAchievement(achievement))
  );
};

export const AchievementsGrid = () => {
  const [t] = useTranslation('achievement');
  const {
    state,
    setPage,
    setScrolling,
    setSearch,
    setSelectedGrades,
    setShowCompleted,
    setShowInProgress,
    resetFilters,
  } = useAchievementsGridState();
  const { data, isLoading, isError } = useMyAchievement();
  const vibrationScroll = createThrottledVibrationHandler()
  const {mobile} = useResponsive()

  const allAchievements = useMemo(
    
    () => flattenAchievements(data?.data.items),
    [data.data.items]
  );
  const filteredAchievements = useMemo(() => {
    const searchQuery = state.search.trim().toLowerCase();

    return allAchievements.filter((achievement) => {
      const isGradeMatch =
        state.selectedGrades.length === 0 ||
        state.selectedGrades.includes(achievement.badge_type);

      const isStatusMatch =
        (state.showCompleted && achievement.is_completed) ||
        (state.showInProgress && !achievement.is_completed);

      const isSearchMatch =
        searchQuery.length === 0 ||
        achievement.name.toLowerCase().includes(searchQuery) ||
        achievement.description.toLowerCase().includes(searchQuery);

      return isGradeMatch && isStatusMatch && isSearchMatch;
    });
  }, [allAchievements, state]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAchievements.length / PAGE_SIZE)
  );
  const safePage = Math.min(state.page, totalPages);
  const achievements = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredAchievements.slice(start, start + PAGE_SIZE);
  }, [filteredAchievements, safePage]);

  if (isLoading) {
    return (
      <Box p="xs">
        <Text c="dimmed" size="sm">
          {t('loading')}
        </Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert color="red" icon={<CircleSlash size={16} />} m="xs">
        {t('load_error')}
      </Alert>
    );
  }

  if (allAchievements.length === 0) {
    return (
      <Alert color="gray" icon={<CircleSlash size={16} />} m="xs">
        {t('empty')}
      </Alert>
    );
  }

  return (
    <Box
      h="100%"
      style={{
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'clip',
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <m.div
          style={{ zIndex: 200 }}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -100, opacity: 0 }}
          exit={{ y: -100, opacity: 0 }}
        >
          <AchievementFilters
            selectedGrades={state.selectedGrades}
            onSelectedGradesChange={(grades) => {
              setSelectedGrades(grades);
            }}
            search={state.search}
            onSearchChange={(value) => {
              setSearch(value);
            }}
            showCompleted={state.showCompleted}
            onShowCompletedChange={(value) => {
              setShowCompleted(value);
            }}
            showInProgress={state.showInProgress}
            onShowInProgressChange={(value) => {
              setShowInProgress(value);
            }}
            onClear={() => {
              resetFilters();
            }}
          />
        </m.div>
      </AnimatePresence>
      {achievements.length === 0 ? (
        <Alert color="gray" icon={<CircleSlash size={16} />} m="xs">
          {t('empty_filtered')}
        </Alert>
      ) : (
        <Virtuoso
          key={safePage}
          style={{
            flex: 1,
            minHeight: 0,
          }}
          components={{
            List: VirtuosoList,
          }}
            onScroll={vibrationScroll}
          totalCount={achievements.length}
          computeItemKey={(index) => achievements[index].achievement_id}
          increaseViewportBy={176}
          isScrolling={setScrolling}
          itemContent={(index) => (
            <Box mb="sm">
              <AchievementCard
                achievement={achievements[index]}
                simplifycity={state.isScrolling}
              />
            </Box>
          )}
        />
      )}
      {achievements.length > 0 && (
        <Center p="xs">
          <Pagination
            boundaries={0}
            value={safePage}
            onChange={setPage}
            total={totalPages}
            size={mobile ? 'sm':'md'}
            withEdges
          />
        </Center>
      )}
    </Box>
  );
};
