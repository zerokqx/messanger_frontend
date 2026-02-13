import { SearchInputWrapper } from '@/features/search';
import {
  ActionIcon,
  Burger,
  Group,
  Menu,
  MenuTarget,
  Skeleton,
  Stack,
  type TextInputProps,
} from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { tabs } from '@/shared/ui/query-tabs';
import { lazy, Profiler, Suspense, useRef } from 'react';
import * as m from 'motion/react-m';
import { QuickLinks } from './quick-links.tsx';
import { quickTabs, quickTabsSettings } from '../config/tabs.tsx';
import { usePanelMode } from '../model/panle-mode-store.ts';
import { useTabsHistory } from '@/shared/ui/query-tabs/model/tabs-history.ts';
import { useLogger } from '@mantine/hooks';

const hiddenNavbarPanel = tabs.typedArray('tnavbar', ['profile', 'search']);
const LazyQuickLinksBar = lazy(() =>
  import('./quick-links-bar.tsx').then((m) => ({ default: m.QuickLinksBar }))
);
export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const d = useTabsHistory((s) => s.data.tnavbar);
  const currentNavbar = tabs.useTabs('tnavbar');
  useLogger('Hist', [d]);

  const showNavbarPanel = !hiddenNavbarPanel.includes(currentNavbar);
  const showButtonBack =
    currentNavbar === 'search' ||
    currentNavbar === 'profile' ||
    currentNavbar === 'profile-edit';

  return (
    <m.div exit={{ y: -100 }} ref={headerRef} animate={{ y: [-100, 0] }}>
      <Stack gap={'0'}>
        <Group p="xs" wrap="nowrap">
          <AnimatePresence mode="popLayout" initial={false}>
            {!showButtonBack && (
              <m.div
                key="button-menu"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Menu>
                  <MenuTarget>
                    <Burger />
                  </MenuTarget>
                </Menu>
              </m.div>
            )}
            {showButtonBack && (
              <m.div
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
              </m.div>
            )}
          </AnimatePresence>
          <m.div layout style={{ flex: 1 }}>
            <SearchInputWrapper
              styles={{ input: { borderRadius: '100px' } }}
              bdrs={'xl'}
              flex={1}
              {...input}
            />
          </m.div>
        </Group>

        <AnimatePresence initial={false} mode="popLayout">
          {showNavbarPanel && (
            <m.div
              key={'tnavbar-links'}
              animate={{
                y: 0,
                opacity: 1,
              }}
              initial={{
                y: 10,
                opacity: 0,
              }}
              exit={{
                y: -10,
                opacity: 0,
              }}
            >
              <QuickLinks
                activeValue={currentNavbar}
                onClickAnyLink={(v) => {
                  tabs.tabsHistoryAction.doPush('tnavbar', v);
                }}
                links={quickTabs}
              />
            </m.div>
          )}
        </AnimatePresence>
      </Stack>
    </m.div>
  );
};
