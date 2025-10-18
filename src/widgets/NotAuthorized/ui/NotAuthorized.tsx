import { useCheckAuth } from '@/features/checkAuth';
import { CenterFlex } from '@/shared/ui/CenterFlex';
import { LoginModal } from '@/widgets/LoginModal';
import { RegisterModal } from '@/widgets/RegisterModal/ui/RegisterModal';
import { Loader } from 'lucide-react';
import { lazy, Suspense } from 'react';

const WelcomeLazy = lazy(() => import('@/shared/ui/Welcome/ui/Welcome'));
export const NotAuthorized = () => {
  const isAuth = useCheckAuth();
  // WARN: Modals
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <CenterFlex>
        <Suspense fallback={<Loader color="white" />}>
          {!isAuth && <WelcomeLazy>Yobble</WelcomeLazy>}
        </Suspense>
      </CenterFlex>
    </>
  );
};
