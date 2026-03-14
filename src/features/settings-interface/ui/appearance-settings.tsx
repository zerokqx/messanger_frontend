import {
  PrimaryColorSchema,
  useSettingsStore,
} from '@/shared/lib/settings';
import { errorNotify } from '@/shared/lib/notifications/error';
import { ThemeSelect } from '@/shared/ui/theme-select';
import { Select, Text, useMantineTheme } from '@mantine/core';
import has from 'lodash/has';
import { useTranslation } from 'react-i18next';
import { ChangeLanguage } from './change-language.tsx';

const TextTitle = Text.withProps({ size: 'md', opacity: 0.8 });

export const AppearanceSettings = () => {
  const { t } = useTranslation('settings-tab');
  const theme = useMantineTheme().colors;
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  const update = useSettingsStore((s) => s.update);

  return (
    <>
      <TextTitle>{t('theme-category')}</TextTitle>
      <ThemeSelect />
      <ChangeLanguage />

      <Select
        label={t('primary-color-label')}
        allowDeselect={false}
        value={primaryColor}
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
        data={PrimaryColorSchema.options.map((color) => ({
          value: color,
          label: t(color),
        }))}
      />
    </>
  );
};
