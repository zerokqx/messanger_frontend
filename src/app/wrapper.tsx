import { useSettingsStore } from '@/shared/lib/settings';
import { queryClient } from '@/shared/api';
import { i18n } from '@/shared/i18next/clients';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { LazyMotion, MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { theme } from './mantine';
import { InnerApp } from './ui/inner-app';
import { NotificationStyled } from './ui/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { getGetContactCountContactCountGetQueryKey } from '@/shared/api/orval/user-service/v1-user/v1-user.ts';
import { QueryClientProvider } from '@tanstack/react-query';

const loadFeatures = () =>
  import('./features-dom-animation.ts').then((res) => res.default);

export const Wrapper = () => {
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  const animationStyle = useSettingsStore((s) => s.data.animations);
  const withAnimations = useSettingsStore((s) => s.data.withAnimations);
  const radius = useSettingsStore((s) => s.data.radius);
  const duratationAllAnimations = useSettingsStore(
    (s) => s.data.duratationAllAnimations
  );
  console.log(getGetContactCountContactCountGetQueryKey(), 'SDA');

  return (
    <StrictMode>
      <MantineProvider
        theme={{
          ...theme,
          primaryColor,
          radius,
        }}
        defaultColorScheme="light"
      >
          <LazyMotion strict features={loadFeatures}>
            <QueryClientProvider
              client={queryClient}
            >
              <I18nextProvider i18n={i18n}>
                <ModalsProvider>
                  <MotionConfig
                    reducedMotion="user"
                    transition={{
                      type: animationStyle,
                      duration: withAnimations ? duratationAllAnimations : 0,
                    }}
                  >
                    <InnerApp />
                  </MotionConfig>
                </ModalsProvider>
                <NotificationStyled />
              </I18nextProvider>
            </QueryClientProvider>
          </LazyMotion>
      </MantineProvider>
    </StrictMode>
  );
};
