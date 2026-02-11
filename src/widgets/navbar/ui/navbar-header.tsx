import { SearchInputWrapper } from '@/features/search';
import { ActionIcon, Group, Stack, type TextInputProps } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { QuickLinks } from './quick-links';
import { tabs } from '@/shared/ui/query-tabs';
import { quickTabs, quickTabsSettings } from '../config/tabs';
import { QuickLinksBar } from './quick-links-bar';
import { useEffect, useRef } from 'react';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const currentSettings = tabs.useTabs('tsettings');
  const currentNavbar = tabs.useTabs('tnavbar');
  const showSettingsPanel =
    currentNavbar === 'settings' && currentSettings !== 'main';
  const showMainPanel = !showSettingsPanel && currentNavbar !== 'profile';
  const headerWidth = headerRef.current?.clientWidth ?? 400;

  return (
    <motion.div exit={{ y: -100 }} ref={headerRef} animate={{ y: [-100, 0] }}>
      <Stack gap={'0'}>
        <Group p="xs" wrap="nowrap">
          <AnimatePresence mode="popLayout" initial={false}>
            {(currentNavbar === 'search' || currentNavbar === 'profile') && (
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
                  onClick={() => tabs.tabsHistoryAction.doBack('tnavbar')}
                  aria-label="Назад"
                >
                  <ArrowLeft />
                </ActionIcon>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout style={{ flex: 1 }}>
            <SearchInputWrapper
              styles={{ input: { borderRadius: '100px' } }}
              bdrs={'xl'}
              flex={1}
              {...input}
            />
          </motion.div>
        </Group>
        <QuickLinksBar
          moitonProps={{
            exit: {
              x: '100%',
              opacity: 0,
            },
          }}
          {...{
            showMainPanel,
            showSettingsPanel,
            currentNavbar,
            currentSettings,
          }}
        />
      </Stack>
    </motion.div>
  );
};
