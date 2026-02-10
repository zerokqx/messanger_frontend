import { type ReactNode } from 'react';
import { AppShellNavbar, Center, Loader, Text } from '@mantine/core';
import { NavbarHeader } from './navbar-header';
import { NuqsTabsNavigate } from '@/shared/ui/nuqs-base-tabs';
import { MotionConfig } from 'motion/react';

interface AppShellNavbarWidgetProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export const AppShellNavbarWidget = ({
  children,
  fallback,
}: AppShellNavbarWidgetProps) => {
  const defaultFallback = fallback ?? (
    <Center py="md">
      <Loader />
    </Center>
  );

  return (
    <AppShellNavbar
      style={{
        overflow: 'clip',
      }}
    >
      <NuqsTabsNavigate
        queryKey="tnavbar"
        children={(set) => (
          <NavbarHeader
            input={{
              onFocus: () => {
                void set('search');
              },
            }}
          />
        )}
      />
      {children}
    </AppShellNavbar>
  );
};
