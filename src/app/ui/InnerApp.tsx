import { useAuth } from '@/shared/model/authProviderContext';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '../main';
import { queryClient } from '@/shared/api';

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

export const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
