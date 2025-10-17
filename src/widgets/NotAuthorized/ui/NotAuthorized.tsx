import { useCheckAuth } from '@/features/checkAuth';
import { LoginModal } from '@/widgets/LoginModal';
import { Flex } from '@mantine/core';
import { Loader } from 'lucide-react';
import { lazy, Suspense } from 'react';

const WelcomeLazy = lazy(() => import('@/shared/ui/Welcome/ui/Welcome'));
export const NotAuthorized = () => {
  const isAuth = useCheckAuth();

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Suspense fallback={<Loader color="white" />}>
        <LoginModal/>
        {!isAuth && <WelcomeLazy>Yobble</WelcomeLazy>}
      </Suspense>
    </Flex>
  );
};
