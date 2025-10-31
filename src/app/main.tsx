import { useAuth } from '@/shared/model/authProviderContext';
import type { AuthContextTypes } from '@/shared/model/authProviderContext/context.type';
import '@/shared/styles/root.css';
import { theme } from '@/shared/theme';
import { SettingsProvider } from '@/widgets/Settings';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import localForage from 'localforage';
import { domAnimation, LazyMotion } from 'motion/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/auth/AuthProvide';
import { routeTree } from './routeTree.gen';
import { NotificationStyled } from './ui/Notifications';
export const router = createRouter({
  routeTree,
  defaultPreload: 'viewport',
  scrollRestoration: true,
  context: {
    auth: {} as unknown as AuthContextTypes,
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: localForage,
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

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
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <LazyMotion features={domAnimation}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
              persister: asyncStoragePersister,
            }}
          >
            <AuthProvider>
              <SettingsProvider>
                <InnerApp />
                <NotificationStyled />
              </SettingsProvider>
            </AuthProvider>
          </PersistQueryClientProvider>
        </LazyMotion>
      </MantineProvider>
    </StrictMode>
  );
}
