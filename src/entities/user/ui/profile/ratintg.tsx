import { lazy, Suspense } from 'react';
import { useProfileContext } from '../../model/profile-context';
import type { IUserProfile } from './types/user-profile.types';
import { useTranslation } from 'react-i18next';

const LazyRatingFlake = lazy(() =>
  import('./lazy/rating.tsx').then((m) => ({
    default: m.LazyRating,
  }))
);

export const Rating: IUserProfile['Rating'] = () => {
  const { rating } = useProfileContext();
  return (
    rating?.rating && (
      <Suspense fallback={null}>
        <LazyRatingFlake rating={rating.rating} />
      </Suspense>
    )
  );
};
