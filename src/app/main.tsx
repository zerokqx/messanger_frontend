import { asyncStoragePersister, queryClient } from '@/shared/api';
import type { AuthContextTypes } from '@/shared/model/authProviderContext/context.type';
import '@/shared/styles/root.css';
import { theme } from '@/shared/theme';
import { SettingsProvider } from '@/widgets/Settings';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRouter } from '@tanstack/react-router';
import { domAnimation, LazyMotion } from 'motion/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/auth/AuthProvide';
import { routeTree } from './routeTree.gen';
import { InnerApp } from './ui/InnerApp';
import { NotificationStyled } from './ui/Notifications';
import { I18nextProvider } from 'react-i18next';
import i18next from '@/shared/i18next/clients';
export const router = createRouter({
  routeTree,
  defaultPreload: 'viewport',
  scrollRestoration: true,
  context: {
    auth: {} as unknown as AuthContextTypes,
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
                <I18nextProvider i18n={i18next}>
                  <InnerApp />
                  <NotificationStyled />
                </I18nextProvider>
              </SettingsProvider>
            </AuthProvider>
          </PersistQueryClientProvider>
        </LazyMotion>
      </MantineProvider>
    </StrictMode>
  );
}
