import type { ReactNode } from 'react';

export type AchievementBadgeType =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'legendary';

export interface AchievementItem {
  achievement_id: number;
  code: string;
  name: string;
  description: string;
  icon?: string | null;
  category: string;
  badge_type: AchievementBadgeType;
  is_completed: boolean;
  unlocked_at?: string | null;
  progress?: number | null;
  required_progress?: number | null;
}

export interface AchievementCardProps {
  achievement: AchievementItem;
  rightSection?: ReactNode;
  simplifycity?: boolean;
}

export interface AchievementFiltersProps {
  selectedGrades: AchievementBadgeType[];
  onSelectedGradesChange: (grades: AchievementBadgeType[]) => void;
  search: string;
  onSearchChange: (value: string) => void;
  showCompleted: boolean;
  onShowCompletedChange: (value: boolean) => void;
  showInProgress: boolean;
  onShowInProgressChange: (value: boolean) => void;
  onClear: () => void;
}
