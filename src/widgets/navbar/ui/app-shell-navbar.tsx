import { type ReactNode } from 'react';
import { AppShellNavbar, Center, Loader, Text } from '@mantine/core';
import { NavbarHeader } from './navbar-header';
import { TabsNavigate } from '@/shared/ui/query-tabs';
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
    <AppShellNavbar style={{ overflow: 'auto' }}>
      <TabsNavigate
        queryKey="tnavbar"
        children={({ push }) => (
          <NavbarHeader
            input={{
              onFocus: () => {
                push('search');
              },
            }}
          />
        )}
      />
      {children}
    </AppShellNavbar>
  );
};
