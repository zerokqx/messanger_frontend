import { lazy, Suspense } from 'react';
import type { IUserProfile } from './types';
import { useProfileContext } from '../../model/current-user-profile-context.ts';

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
