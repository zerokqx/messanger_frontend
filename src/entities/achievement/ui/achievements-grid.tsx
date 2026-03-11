import { Alert, Box, Pagination, Text } from '@mantine/core';
import { CircleSlash } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useMyAchievement } from '../api';
import { AchievementCard } from './achievement-card';
import type { AchievementItem } from './types';

const PAGE_SIZE = 10;

const VirtuosoList = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} style={{ ...props.style, paddingBottom: '8px' }} />;
};

const normalizeAchievement = (item: Partial<AchievementItem>): AchievementItem => ({
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
  const [isScrolling, setIsScrolling] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMyAchievement();

  const allAchievements = useMemo(
    () => flattenAchievements(data?.data.items),
    [data?.data.items]
  );
  const totalPages = Math.max(1, Math.ceil(allAchievements.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const achievements = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return allAchievements.slice(start, start + PAGE_SIZE);
  }, [allAchievements, safePage]);

  if (isLoading) {
    return (
      <Box p="xs">
        <Text c="dimmed" size="sm">
          Loading achievements...
        </Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert color="red" icon={<CircleSlash size={16} />} m="xs">
        Failed to load achievements
      </Alert>
    );
  }

  if (achievements.length === 0) {
    return (
      <Alert color="gray" icon={<CircleSlash size={16} />} m="xs">
        No achievements yet
      </Alert>
    );
  }

  return (
    <Box h="100%" style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Virtuoso
        key={safePage}
        style={{
          flex: 1,
          minHeight: 0,
        }}
        components={{
          List: VirtuosoList,
        }}
        totalCount={achievements.length}
        computeItemKey={(index) => achievements[index].achievement_id}
        increaseViewportBy={300}
        isScrolling={setIsScrolling}
        itemContent={(index) => (
          <Box mb="sm">
            <AchievementCard
              achievement={achievements[index]}
              simplifycity={isScrolling}
            />
          </Box>
        )}
      />
      <Box p="xs">
        <Pagination
          value={safePage}
          onChange={setPage}
          total={totalPages}
          size="sm"
          withEdges
        />
      </Box>
    </Box>
  );
};
