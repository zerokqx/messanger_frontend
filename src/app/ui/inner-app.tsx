import { RouterProvider } from '@tanstack/react-router';
import { router } from '../main';
import { queryClient } from '@/shared/api';
import { useIsAuth } from '@/entities/session';
import {  useQueryClient } from '@tanstack/react-query';

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

export const InnerApp = () => {
  const auth = useIsAuth();
  const queryClient = useQueryClient()
  return <RouterProvider router={router} context={{ auth ,queryClient}} />;
};
