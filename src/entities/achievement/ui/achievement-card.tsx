import {
  Badge,
  Box,
  Card,
  Group,
  Progress,
  RingProgress,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { Trophy } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
}: AchievementCardProps) => {
  const [t] = useTranslation('achievement');
  const theme = badgeThemeMap[achievement.badge_type];
  const progress = achievement.progress ?? 0;
  const requiredProgress = achievement.required_progress ?? 0;
  const progressPercent = getProgressPercent(progress, requiredProgress);
  return (
    <Card radius="xl" p="md" bd="1px solid vdarkGray.4">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group align="center" wrap="nowrap">
          <ThemeIcon size={52} radius="md" variant="light" color={theme.color}>
            <Trophy size={24} />
          </ThemeIcon>

          <Stack gap={2}>
            <Group gap="xs">
              <Text fw={700} lineClamp={1}>
                {achievement.name}
              </Text>
            </Group>
            <Group>
              <Badge variant="light" color={theme.color}>
                {t(`badge.${achievement.badge_type}`)}
              </Badge>
              <Badge variant="gradient">#{achievement.category}</Badge>
            </Group>
            <Text size="xs" opacity={0.5} >
              {achievement.description}
            </Text>
          </Stack>
        </Group>
      </Group>

      <Group mt="md" justify="space-between" wrap="nowrap" align="center">
        <Stack gap={6} flex={1}>
          <Text size="xs">
            {t('progress', { progress, required: requiredProgress })}
          </Text>

          <Progress value={progressPercent} radius="xl" color={theme.color} />
        </Stack>

        <Box w={54} h={54}>
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
              <Text size="xs" fw={700} ta="center">
                {progressPercent}%
              </Text>
            }
          />
        </Box>
      </Group>
    </Card>
  );
};

export const AchievementCard = memo(AchievementCardBase);
