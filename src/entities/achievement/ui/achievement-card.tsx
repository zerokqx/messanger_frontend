import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  Progress,
  RingProgress,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { Check, Lock, Trophy } from 'lucide-react';
import { memo } from 'react';
import type { AchievementBadgeType, AchievementCardProps } from './types';

const badgeThemeMap: Record<
  AchievementBadgeType,
  { color: string; background: string }
> = {
  bronze: {
    color: 'orange',
    background: 'linear-gradient(135deg, #5a432f, #a66d3b)',
  },
  silver: {
    color: 'gray',
    background: 'linear-gradient(135deg, #5c6575, #98a3b5)',
  },
  gold: {
    color: 'yellow',
    background: 'linear-gradient(135deg, #87650f, #d1a623)',
  },
  platinum: {
    color: 'indigo',
    background: 'linear-gradient(135deg, #404a67, #7b8db8)',
  },
  diamond: {
    color: 'cyan',
    background: 'linear-gradient(135deg, #235d74, #41a7d1)',
  },
  legendary: {
    color: 'grape',
    background: 'linear-gradient(135deg, #5f296a, #b855ca)',
  },
};

const getProgressPercent = (progress: number, required: number) => {
  if (required <= 0) return 0;
  return Math.min(100, Math.round((progress / required) * 100));
};

const AchievementCardBase = ({
  achievement,
  rightSection,
  simplifycity = false,
}: AchievementCardProps) => {
  const theme = badgeThemeMap[achievement.badge_type];
  const progress = achievement.progress ?? 0;
  const requiredProgress = achievement.required_progress ?? 0;
  const progressPercent = getProgressPercent(progress, requiredProgress);
  const unlockedDate = achievement.unlocked_at
    ? new Date(achievement.unlocked_at).toLocaleDateString()
    : null;

  return (
    <Card
      radius="xl"
      p="md"
      bd="1px solid var(--mantine-color-dark-4)"
      style={{
        overflow: 'hidden',
        minHeight: 152,
        background: achievement.is_completed
          ? `radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 45%), ${theme.background}`
          : 'linear-gradient(135deg, var(--mantine-color-dark-8), var(--mantine-color-dark-6))',
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group align="center" wrap="nowrap">
          <ThemeIcon size={52} radius="md" variant="light" color={theme.color}>
            <Trophy size={24} />
          </ThemeIcon>

          <Stack gap={2}>
            <Group gap="xs">
              <Text fw={700} c="white" lineClamp={1}>
                {achievement.name}
              </Text>
              <Badge variant="light" color={theme.color}>
                {achievement.badge_type}
              </Badge>
            </Group>
            <Text size="xs" opacity={0.5} lineClamp={2}>
              {achievement.description}
            </Text>
            <Text size="xs" c="gray.3">
              #{achievement.category}
            </Text>
          </Stack>
        </Group>
        <Group gap="xs" wrap="nowrap">
          {!simplifycity ? (
            <Tooltip
              label={
                achievement.is_completed
                  ? `Completed${unlockedDate ? `: ${unlockedDate}` : ''}`
                  : 'In progress'
              }
            >
              <ThemeIcon
                size={28}
                radius="xl"
                variant="filled"
                color={achievement.is_completed ? 'teal' : 'dark'}
              >
                {achievement.is_completed ? (
                  <Check size={16} />
                ) : (
                  <Lock size={16} />
                )}
              </ThemeIcon>
            </Tooltip>
          ) : (
            <Skeleton w={28} h={28} circle />
          )}
          {rightSection}
        </Group>
      </Group>

      <Group mt="md" justify="space-between" wrap="nowrap" align="center">
        <Stack gap={6} flex={1}>
          <Text size="xs" c="gray.2">
            Progress: {progress}/{requiredProgress}
          </Text>

          {!simplifycity ? (
            <Progress value={progressPercent} radius="xl" color={theme.color} />
          ) : (
            <Skeleton w={259} h={8} />
          )}
        </Stack>

        <Box w={54} h={54}>
          {!simplifycity ? (
            <RingProgress
              size={54}
              thickness={6}
              roundCaps
              sections={[
                {
                  value: progressPercent,
                  color: `var(--mantine-color-${theme.color}-5)`,
                },
              ]}
              label={
                <Text size="xs" fw={700} ta="center" c="white">
                  {progressPercent}%
                </Text>
              }
            />
          ) : (
            <Skeleton h={42} w={42} circle />
          )}
        </Box>
      </Group>
    </Card>
  );
};

export const AchievementCard = memo(AchievementCardBase);
