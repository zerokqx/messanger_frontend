import { lazy } from 'react';
import type { IUserProfile } from './types';
import { useProfileContext } from '../../model/current-user-profile-context.ts';

const LazyBioFlake = lazy(() =>
  import('./lazy/bio.tsx').then((m) => ({
    default: m.LazyBio,
  }))
);

export const Bio: IUserProfile['Bio'] = () => {
  const { bio } = useProfileContext();
  return bio && <LazyBioFlake bio={bio} />;
};
