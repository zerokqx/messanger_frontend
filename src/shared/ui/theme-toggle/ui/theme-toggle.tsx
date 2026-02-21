import { Stack, Switch } from '@mantine/core';
import { useTheme } from '../hooks/use-theme';
import { useTranslation } from 'react-i18next';
import { useLogger } from 'react-use';
export const ThemeToggle = () => {
  const { t } = useTranslation('side-bar');
  const { Icon, set, colorScheme } = useTheme();

  useLogger('theme', { colorScheme });
  return (
    <Switch
      onChange={() => {
        set();
      }}
      aria-label={t('dark_theme')}
      label={t('dark_theme')}
      checked={colorScheme === 'dark'}
      offLabel={<Icon size={16} />}
      onLabel={<Icon size={16} />}
    />
  );
};
