import {
  AnimationSchema,
  useSettingsStore,
} from '@/shared/lib/settings';
import { notify } from '@/shared/lib/notifications';
import { Select, Slider, Space, Switch, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { TextTitle } from './text-title';


export const AnimationSettings = () => {
  const { t } = useTranslation('settings-tab');
  const { animations, withAnimations, duratationAllAnimations } =
    useSettingsStore((s) => s.data);
  const update = useSettingsStore((s) => s.update);

  return (
    <>
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
        data={AnimationSchema.options.map((animation) => ({
          value: animation,
          label: t(animation),
        }))}
      />

      <Slider
        label={(v) => v.toFixed(1)}
        disabled={!withAnimations}
        max={1}
        value={duratationAllAnimations}
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
    </>
  );
};
