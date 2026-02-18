import { Suspense } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  ButtonGroup,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { ArrowLeft, Home, Palette, Shield } from 'lucide-react';
import { InterfaceEditTab } from '@/features/settings-interface/ui/edit';
import { InterfaceEditSkeleton } from '@/features/settings-interface';
import { SessionsTab } from '@/features/session/ui/session-manager';
import { useTranslation } from 'react-i18next';
import { SessionListSkeleton } from '@/features/session';
import type { RootTabsProps } from './types.ts';

const RootTabsTitle = () => {
  const [t] = useTranslation('navbar');
  return (
    <Tabs.UseApi children={({ state }) => <Text>{t(state.current)}</Text>} />
  );
};

export const RootTabs = ({ children }: RootTabsProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Tabs animationVariant="slide-x">
      <Box p={'xs'}>
        <Stack>
          <Tabs.Hide when={['main']} animationVariant="drop-card">
            <Group
              justify="space-between"
              bg={colorScheme === 'dark' ? 'dark.8' : 'gray.1'}
              p={'xs'}
              bdrs={'xl'}
            >
              <Tabs.UseApi
                children={({ actions }) => (
                  <ActionIcon
                    onClick={() => {
                      actions.back();
                    }}
                    bdrs="xl"
                    variant="light"
                  >
                    <ArrowLeft />
                  </ActionIcon>
                )}
              />
              <RootTabsTitle />
              <Tabs.UseApi
                children={({ actions }) => (
                  <ActionIcon
                    onClick={() => {
                      actions.reset('main');
                    }}
                    bdrs="xl"
                    variant="light"
                  >
                    <Home />
                  </ActionIcon>
                )}
              />
            </Group>
          </Tabs.Hide>
          <Tabs.Tab value="settings/sessions">
            <Suspense fallback={<SessionListSkeleton />}>
              <SessionsTab />
            </Suspense>
          </Tabs.Tab>
          {children}
          <Tabs.Tab value="settings/interface">
            <Suspense fallback={<InterfaceEditSkeleton />}>
              <InterfaceEditTab />
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="settings">
            <Stack>
              <Tabs.UseApi
                children={({ actions }) => (
                  <Stack>
                    <Button
                      onClick={() => {
                        actions.push('settings/interface');
                      }}
                      leftSection={<Palette />}
                      fullWidth
                      variant="light"
                      justify="start"
                    >
                      Интерфейс
                    </Button>
                    <Button
                      onClick={() => {
                        actions.push('settings/sessions');
                      }}
                      leftSection={<Shield />}
                      fullWidth
                      variant="light"
                      justify="start"
                    >
                      Безопастность
                    </Button>
                  </Stack>
                )}
              />
            </Stack>
          </Tabs.Tab>
        </Stack>
      </Box>
    </Tabs>
  );
};
