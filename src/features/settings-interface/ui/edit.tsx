import {
  AnimationSchema,
  PrimaryColorSchema,
  SettingsSchema,
  useSettingsStore,
} from '@/shared/lib/hooks/settings';
import { supportColors } from '../config/support-colors';
import { errorNotify } from '@/shared/lib/notifications/error';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import {
  Divider,
  Select,
  Slider,
  Space,
  Stack,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { has } from 'lodash';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import { notify } from '@/shared/lib/notifications';
import { useInterval } from 'react-use';

const TextTitle = Text.withProps({ size: 'md', opacity: 0.8 });

export const InterfaceEditTab = () => {
  const { t } = useTranslation('settings-tab');
  const theme = useMantineTheme().colors;
  const state = useSettingsStore((s) => s.data, shallow);

  useInterval(() => {
    const parseState = SettingsSchema.safeParse(state);
    if (!parseState.success) {
      reset();
    }
  }, 10000);
  const update = useSettingsStore((s) => s.update);

  const reset = useSettingsStore((s) => s.reset);
  const { animations, primaryColor, withAnimations, duratationAllAnimations } =
    state;
  return (
    <>
      <Stack gap={'md'}>
        <TextTitle>{t('animations')}</TextTitle>
        <Select
          label={t('animations-label')}
          disabled={!withAnimations}
          value={animations}
          allowDeselect={false}
          onChange={(v) => {
            const parsed = AnimationSchema.safeParse(v);

            if (!parsed.success) {
              notify.error({
                title: t('animation-error'),
                message: t('animation-error-message'),
              });
              return;
            }

            update((s) => (s.animations = parsed.data));
          }}
          defaultValue={animations}
          data={AnimationSchema.options.map((animation) => ({
            value: animation,
            label: t(animation),
          }))}
        />

        <Slider
          label={(v) => v.toFixed(1)}
          disabled={!withAnimations}
          max={1}
          defaultValue={duratationAllAnimations}
          min={0.2}
          onChange={(v) => {
            update((s) => (s.duratationAllAnimations = v));
          }}
          step={0.2}
          marks={[
            { value: 0.4, label: t('animation-speed-smoothly') },
            { value: 0.8, label: t('animation-speed-super-smoothly') },
          ]}
        />
        <Space h={'5px'} />
        <Switch
          label={t('with-animation-label')}
          checked={withAnimations}
          description={t('with-animations-description')}
          onChange={(e) => {
            update((s) => (s.withAnimations = e.currentTarget.checked));
          }}
        />
        <Divider />
        <TextTitle>{t('theme-category')}</TextTitle>
        <ThemeToggle />

        <Select
          label={t('primary-color-label')}
          allowDeselect={false}
          value={primaryColor}
          defaultValue={primaryColor}
          onChange={(v) => {
            const parse = PrimaryColorSchema.safeParse(v);
            if (parse.success && has(theme, parse.data)) {
              update((s) => (s.primaryColor = parse.data));
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
      </Stack>
    </>
  );
};
