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
import {
  Settings,
  UserRound,
  Users,
  Home,
  ArrowLeft,
  User,
  ShieldPlus,
  Palette,
} from 'lucide-react';
import { MatchRoute, useMatch, useRouter } from '@tanstack/react-router';
import { useNuqsTab } from '@/shared/ui/nuqs-base-tabs';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { QuickLinks, type QuickLink } from './quick-links';
const panelVariants = {
  initial: (direction = 1) => ({ x: -400 }),
  animate: { x: 0 },
  exit: (direction = 1) => ({ x: 400 }),
};
const panelTransition = {
  type: 'spring',
  stiffness: 420,
  damping: 38,
  mass: 0.9,
};
const mainQuickLinksHidden = ['profile', 'search', 'settings'];

const quickTabs = [
  { value: 'main', label: 'Main', icon: <Home /> },
  { value: 'contacts', label: 'Contacts', icon: <Users /> },
  { value: 'profile', label: 'Profile', icon: <UserRound /> },
  { value: 'settings', label: 'Settings', icon: <Settings /> },
];

const quickTabsSettings: QuickLink[] = [
  { value: 'main', label: 'Main', icon: <ArrowLeft /> },
  { value: 'interface', label: 'Interface', icon: <Palette /> },
  { value: 'sessions', label: 'Sessions', icon: <ShieldPlus /> },
];
export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const [tabNuqsSettings, setNuqsTabSettings] = useNuqsTab('tsettings');
  const [tabNuqs, setTab] = useNuqsTab('tnavbar');
  const route = useRouter();
  const isSettings = tabNuqs === 'settings';
  const isSettingsInner = isSettings && tabNuqsSettings !== 'main';
  const showMainPanel =
    !isSettings || tabNuqsSettings === 'main' || tabNuqs !== 'settings';
  const showSettingsPanel = isSettingsInner;
  const { colorScheme } = useMantineColorScheme();

  return (
    <motion.div exit={{ y: -100 }} animate={{ y: [-100, 0] }}>
      <Stack gap={'0'}>
        <Group p="xs" wrap="nowrap">
          <AnimatePresence initial={false}>
            {tabNuqs === 'search' && (
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
                  onClick={() => setTab('main')}
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
        {showMainPanel && (
          <QuickLinks
            activeValue={tabNuqs}
            onClickLink={(v) => void setTab(v)}
            links={quickTabs}
          />
        )}

        {showSettingsPanel && (
          <QuickLinks
            activeValue={tabNuqsSettings}
            onClickLink={(v) => setNuqsTabSettings(v)}
            links={quickTabsSettings}
          />
        )}
      </Stack>
    </motion.div>
  );
};
