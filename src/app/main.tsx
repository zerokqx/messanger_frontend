import { queryClient } from '@/shared/api';
import type { AuthContextTypes } from '@/shared/model/auth-provider-context/context.type';
import '@/shared/styles/root.css';
import './lucide.css';
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { createRouter } from '@tanstack/react-router';
import { domAnimation, LazyMotion } from 'motion/react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './route-tree.gen';
import { InnerApp } from './ui/inner-app';
import { NotificationStyled } from './ui/notifications';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/shared/i18next/clients';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { theme } from './mantine';
import { StrictMode } from 'react';
import { useSettingsStore } from '@/features/settings-interface/model/settings-store';
import { useLogger } from '@mantine/hooks';
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
const Wrapper = () => {
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  return (
    <StrictMode>
      <MantineProvider
        theme={{
          ...theme,
          primaryColor,
        }}
        defaultColorScheme="light"
      >
        <LazyMotion features={domAnimation}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <ModalsProvider>
                <InnerApp />
              </ModalsProvider>
              <NotificationStyled />
            </I18nextProvider>
          </QueryClientProvider>
        </LazyMotion>
      </MantineProvider>
    </StrictMode>
  );
};
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Wrapper />);
}
