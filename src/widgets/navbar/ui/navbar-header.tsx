import { SearchInputWrapper } from '@/features/search';
import {
  ActionIcon,
  Group,
  SegmentedControl,
  Stack,
  Tooltip,
  useMantineColorScheme,
  type TextInputProps,
} from '@mantine/core';
import { Settings, UserRound, Users, Home, ArrowLeft } from 'lucide-react';
import { MatchRoute, useMatch, useRouter } from '@tanstack/react-router';
import { useNuqsTab } from '@/shared/ui/nuqs-base-tabs';
import { AnimatePresence, motion } from 'motion/react';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const [tabNuqsSettings] = useNuqsTab('tsettings');
  const [tabNuqs, setTab] = useNuqsTab('tnavbar');
  const route = useRouter();
  const { colorScheme } = useMantineColorScheme();

  const quickTabs = [
    { value: 'main', label: 'Main', icon: Home },
    { value: 'contacts', label: 'Contacts', icon: Users },
    { value: 'profile', label: 'Profile', icon: UserRound },
    { value: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div exit={{ y: -100 }} animate={{ y: [-100, 0] }}>
      <Stack>
        <Group p="xs" wrap="nowrap">
          <AnimatePresence initial={false}>
            {(tabNuqs === 'search' ||
              tabNuqs === 'profile' ||
              tabNuqsSettings !== 'main') && (
              <motion.div
                key="button-back"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ display: 'flex' }}
              >
                <ActionIcon
                  bdrs="xl"
                  variant="light"
                  onClick={() => route.history.back()}
                  aria-label="Назад"
                >
                  <ArrowLeft />
                </ActionIcon>
              </motion.div>
            )}
          </AnimatePresence>

          <SearchInputWrapper
            styles={{ input: { borderRadius: '100px' } }}
            bdrs={'xl'}
            flex={1}
            {...input}
          />
        </Group>

        <AnimatePresence mode="popLayout">
          {tabNuqs !== 'search' && tabNuqs !== 'profile' && (
            <motion.div
              key="tabs-panel"
              initial={{
                y: 0,
              }}
              animate={{ y: [-400, 0], opacity: 1 }}
              exit={{ y: -400, opacity: 0 }}
            >
              <Group
                bg={colorScheme === 'dark' ? 'dark' : 'gray.1'}
                p={'xs'}
                justify="space-evenly"
              >
                {quickTabs.map((t) => {
                  const Icon = t.icon;
                  const active = tabNuqs === t.value;

                  return (
                    <Tooltip
                      key={t.value}
                      label={t.label}
                      openDelay={800}
                      withArrow
                    >
                      <ActionIcon
                        variant={active ? 'filled' : 'light'}
                        color={active ? 'blue' : 'gray'}
                        radius="xl"
                        size="lg"
                        onClick={() => setTab(t.value, { history: 'push' })}
                      >
                        <Icon size={18} />
                      </ActionIcon>
                    </Tooltip>
                  );
                })}
              </Group>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </motion.div>
  );
};
