import { lazy } from 'react';
import { useProfileContext } from '../../model/profile-context';
import type { IUserProfile } from './types/user-profile.types';

const LazyBioFlake = lazy(() =>
  import('./lazy/bio.tsx').then((m) => ({
    default: m.LazyBio,
  }))
);

export const Bio: IUserProfile['Bio'] = () => {
  const { bio } = useProfileContext();
  return bio && <LazyBioFlake bio={bio} />;
};
