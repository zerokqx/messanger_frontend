import { useCheckAuth } from '@/features/checkAuth';
import { CenterFlex } from '@/shared/ui/CenterFlex';
import { LoaderSuspense } from '@/shared/ui/LoaderSuspense';
import { lazy } from 'react';

const WelcomeLazy = lazy(() =>
  import('@/shared/ui/Welcome/ui/Welcome').then(({ Welcome }) => ({
    default: Welcome,
  }))
);
export const NotAuthorized = () => {
  const isAuth = useCheckAuth();
  return (
    <>
      <LoaderSuspense condition={!isAuth} lazyComponent={WelcomeLazy} />
    </>
  );
};
