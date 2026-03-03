import { useSettingsStore } from '@/shared/lib/hooks/settings';
import { queryClient } from '@/shared/api';
import { i18n } from '@/shared/i18next/clients';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { theme } from './mantine';
import { InnerApp } from './ui/inner-app';
import { NotificationStyled } from './ui/notifications';

const loadFeatures = () => import('./features.ts').then((res) => res.default);
export const Wrapper = () => {
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  const animationStyle = useSettingsStore((s) => s.data.animations);
  const withAnimations = useSettingsStore((s) => s.data.withAnimations);
  const duratationAllAnimations = useSettingsStore(
    (s) => s.data.duratationAllAnimations
  );
  return (
    <StrictMode>
      <MantineProvider
        theme={{
          ...theme,
          primaryColor,
        }}
        defaultColorScheme="light"
      >
        <LazyMotion strict features={loadFeatures}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <ModalsProvider>
                <MotionConfig
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
