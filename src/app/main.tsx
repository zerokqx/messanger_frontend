import { useAuth } from '@/shared/model/authProviderContext';
import '@/shared/styles/root.css';
import { theme } from '@/shared/theme';
import { SettingsProvider } from '@/widgets/Settings';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { domAnimation, LazyMotion } from 'motion/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/auth/AuthProvide';
import { routeTree } from './routeTree.gen';
import { NotificationStyled } from './ui/Notifications';
import type { AuthContextTypes } from '@/shared/model/authProviderContext/context.type';
export const router = createRouter({
  routeTree,
  defaultPreload: 'viewport',
  scrollRestoration: true,
  context: {
    auth: {} as unknown as AuthContextTypes,
  },
});

const queryClient = new QueryClient();
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    RouterContext: {
      auth: AuthContextTypes;
    };
  }
}

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <LazyMotion features={domAnimation}>
            <AuthProvider>
              <SettingsProvider>
                <InnerApp />
                <NotificationStyled />
              </SettingsProvider>
            </AuthProvider>
          </LazyMotion>
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
