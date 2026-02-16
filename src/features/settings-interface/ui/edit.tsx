import {
  useSettingsStore,
  type SettingsStoreState,
} from '@/features/settings-interface/model/settings-store';
import { supportAnimations } from '../config/support-animations';
import { supportColors } from '../config/support-colors';
import { errorNotify } from '@/shared/lib/notifications/error';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { Select, Stack, Switch, useMantineTheme } from '@mantine/core';
import { has } from 'lodash';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

const isSupportAnimation = (
  value: string
): value is SettingsStoreState['animations'] =>
  supportAnimations.includes(value as SettingsStoreState['animations']);

export const InterfaceEditTab = () => {
  const { t } = useTranslation('settings-tab');
  const theme = useMantineTheme().colors;
  const { update, animationState, primaryColorState, withAnimationsState } =
    useSettingsStore(
      (s) => ({
        update: s.update,
        animationState: s.data.animations,
        primaryColorState: s.data.primaryColor,
        withAnimationsState: s.data.withAnimations,
      }),
      shallow
    );

  return (
    <>
      <Stack>
        <Select
          label={t('animations-label')}
          allowDeselect={false}
          onChange={(v) => {
            if (v && isSupportAnimation(v)) {
              update((s) => (s.animations = v));
            }
          }}
          defaultValue={animationState}
          data={supportAnimations.map((animation) => ({
            value: animation,
            label: t(animation),
          }))}
        />

        <Select
          label={t('primary-color-label')}
          allowDeselect={false}
          value={primaryColorState}
          defaultValue={primaryColorState}
          onChange={(v) => {
            if (v && has(theme, v)) {
              update((s) => (s.primaryColor = v));
            } else {
              errorNotify(
                t('primary-color-not-exist'),
                t('primary-color-not-exist-title')
              );
            }
          }}
          data={supportColors.map((color) => ({
            value: color,
            label: t(color),
          }))}
        />
        <Switch
          label={t('with-animation-label')}
          checked={withAnimationsState}
          description={t('with-animations-description')}
          onChange={(e) => {
            update((s) => (s.withAnimations = e.currentTarget.checked));
          }}
        />
      </Stack>

      <ThemeToggle />
    </>
  );
};
