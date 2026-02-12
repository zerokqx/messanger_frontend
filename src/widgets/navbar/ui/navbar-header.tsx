import { SearchInputWrapper } from '@/features/search';
import { ActionIcon, Group, Skeleton, Stack, type TextInputProps } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { tabs } from '@/shared/ui/query-tabs';
import { lazy, Suspense, useRef } from 'react';
import * as m from 'motion/react-m';

const LazyQuickLinksBar = lazy(() =>
  import('./quick-links-bar.tsx').then((m) => ({ default: m.QuickLinksBar }))
);
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
  const showMainPanel =
    !showSettingsPanel &&
    currentNavbar !== 'profile' &&
    currentNavbar !== 'profile-edit';

  return (
    <m.div exit={{ y: -100 }} ref={headerRef} animate={{ y: [-100, 0] }}>
      <Stack gap={'0'}>
        <Group p="xs" wrap="nowrap">
          <AnimatePresence mode="popLayout" initial={false}>
            {(currentNavbar === 'search' ||
              currentNavbar === 'profile' ||
              currentNavbar === 'profile-edit') && (
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
        <Suspense fallback={<Skeleton animate h={60} w={'100%'} />}>
          <LazyQuickLinksBar
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
        </Suspense>
      </Stack>
    </m.div>
  );
};
