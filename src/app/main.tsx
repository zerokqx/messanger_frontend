import { theme } from '@/shared/theme';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { Modals } from './ui/Modals';
import { LazyMotion, domAnimation } from 'motion/react';
import '@/shared/styles/root.css';
import { NotificationStyled } from './ui/Notifications';
export const router = createRouter({ routeTree });

const queryClient = new QueryClient();
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <LazyMotion features={domAnimation}>
            <NotificationStyled />
            <RouterProvider router={router} />
            <Modals />
          </LazyMotion>
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
