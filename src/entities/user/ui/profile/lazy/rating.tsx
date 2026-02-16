import { ratingColor } from '@/entities/user/lib/rating-color';
import type { ICurrentProfileContext } from '@/entities/user/model/types';
import { useNotifyClipboard } from '@/shared/lib/hooks/use-notify-clipboard';
import { IconButton } from '@/shared/ui/buttons';
import { LabelBox, Label } from '@/shared/ui/lables';
import { Group, Skeleton } from '@mantine/core';
import { Rating as MantineRating } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LazyRating = ({
  rating,
}: {
  rating: NonNullable<NonNullable<ICurrentProfileContext['rating']>['rating']>;
}) => {
  const copy = useNotifyClipboard();
  const [t] = useTranslation('profile');
  return (
    <IconButton
      onMouseUp={() => {
        copy(toString(rating), t('rating'));
      }}
    >
      <LabelBox>
        <Group gap={'xs'}>
          <MantineRating color={ratingColor(rating)} readOnly value={rating} />
        </Group>
        <Label>{t('rating')}</Label>
      </LabelBox>
    </IconButton>
  );
};

export const RatingSkeleton = () => {
  return <Skeleton h={50} w={50} />;
};
