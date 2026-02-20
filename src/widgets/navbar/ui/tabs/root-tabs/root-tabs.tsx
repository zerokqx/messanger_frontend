import { Suspense } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Skeleton,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { ArrowLeft, Home } from 'lucide-react';
import { InterfaceEditTab } from '@/features/settings-interface/ui/edit';
import { InterfaceEditSkeleton } from '@/features/settings-interface';
import { SessionsTab } from '@/features/session/ui/session-manager';
import { useTranslation } from 'react-i18next';
import { SessionListSkeleton } from '@/features/session';
import type { RootTabsProps } from './types.ts';
import { rootTabs } from '@/widgets/navbar/config/root-tabs.tsx';
import { MotionStagerList } from '@/shared/ui/motion-stager-list/index.ts';

const RootTabsTitle = () => {
  const [t] = useTranslation('navbar');
  return (
    <Tabs.UseApi
      children={({ state }) => (
        <Text c="gray" size="sm" fw={'bold'}>
          {t(state.current)}
        </Text>
      )}
    />
  );
};

export const RootTabs = ({ children }: RootTabsProps) => {
  const { colorScheme } = useMantineColorScheme();
  const [t] = useTranslation('navbar');

  return (
    <Tabs animationVariant="slide-x">
      <Box p={'xs'}>
        <Stack>
          <Tabs.Hide when={['main']} animationVariant="slide-y-up">
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
              <Suspense fallback={<Skeleton w={100} h={'1ch'} />}>
                <RootTabsTitle />
              </Suspense>
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
                  <MotionStagerList
                    variants={{
                      item: {
                        hidden: { scaleY: 0.5 },
                        visible: {
                          scaleY: 1,
                        },
                      },
                    }}
                  >
                    {rootTabs.map(({ value, leftSection }) => (
                      <MotionStagerList.StagerItem key={value}>
                        <Button
                          onClick={() => {
                            actions.push(value);
                          }}
                          leftSection={leftSection}
                          m={'0 auto'}
                          fullWidth
                          variant="light"
                          justify="start"
                        >
                          {t(value)}
                        </Button>
                      </MotionStagerList.StagerItem>
                    ))}
                  </MotionStagerList>
                )}
              />
            </Stack>
          </Tabs.Tab>
        </Stack>
      </Box>
    </Tabs>
  );
};
