import {
  useSettingsStore,
  type SettingsStoreState,
} from '@/features/settings-interface/model/settings-store';
import type Resources from '@/shared/i18next/types/resources';
import { errorNotify } from '@/shared/lib/notifications/error';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import {
  Select,
  Stack,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
  type ComboboxItem,
} from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { notifyManager } from '@tanstack/react-query';
import { has } from 'lodash';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
type ComboboxItemI18N<Res extends keyof Resources> = (ComboboxItem & {
  value: SettingsStoreState['animations'];
  label: keyof Resources[Res];
})[];

const animations: ComboboxItemI18N<'settings'> = [
  {
    value: 'keyframes',
    label: 'keyframes',
  },
  {
    value: 'spring',
    label: 'spring',
  },
];

const primaryColor: ComboboxItemI18N<'settings'> = [
  {
    value: 'blue',
    label: 'blue',
  },

  {
    value: 'indigo',
    label: 'indigo',
  },

  {
    value: 'green',
    label: 'green',
  },
  {
    value: 'gray',
    label: 'gray',
  },

  {
    value: 'red',
    label: 'red',
  },

  {
    value: 'violet',
    label: 'violet',
  },
];

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
            if (v)
              update(
                (s) => (s.animations = v as SettingsStoreState['animations'])
              );
          }}
          defaultValue={animationState}
          data={animations.map((a) => ({
            value: a.value,
            label: t(a.label),
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
          data={primaryColor.map((c) => ({
            ...c,
            label: t(c.label),
          }))}
        />
        <Switch
          label={t('with-animation-label')}
          value={withAnimationsState}
          checked={withAnimationsState}
          description={t('with-animations-description')}
          onChange={(e) => {
            console.log(e.currentTarget.checked);
            update((s) => (s.withAnimations = e.currentTarget.checked));
          }}
        />
      </Stack>

      <ThemeToggle />
    </>
  );
};
