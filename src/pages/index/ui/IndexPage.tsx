import { useCheckAuth } from '@/entities/user/model';
import { Flex, Skeleton } from '@mantine/core';
import { Loader } from 'lucide-react';
import { lazy, Suspense, useState, useEffect } from 'react';

const WelcomeLazy = lazy(() => import('@/shared/ui/Welcome/ui/Welcome'));

export const IndexPage = () => {
  const isAuth = useCheckAuth();

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Suspense fallback={<Loader color="white" />}>
        {!isAuth && <WelcomeLazy>Yobble</WelcomeLazy>}
      </Suspense>
    </Flex>
  );
};
