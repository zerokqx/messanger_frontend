import { SettingsSchema, useSettingsStore } from '@/shared/lib/settings';
import { Divider, Stack } from '@mantine/core';
import { useInterval } from 'react-use';
import { AnimationSettings } from './animation-settings.tsx';
import { AppearanceSettings } from './appearance-settings.tsx';

export const InterfaceEditTab = () => {
  const state = useSettingsStore((s) => s.data);

  const reset = useSettingsStore((s) => s.reset);
  useInterval(() => {
    const parseState = SettingsSchema.safeParse(state);
    if (!parseState.success) {
      reset();
    }
  }, 10000);
  return (
    <Stack gap={'md'}>
      <AnimationSettings />
      <Divider />
      <AppearanceSettings />
    </Stack>
  );
};
