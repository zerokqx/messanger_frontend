import { ActionIcon, Switch } from '@mantine/core';
import { useTheme } from '../hooks/useTheme';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useLogger } from 'react-use';
export const ThemeToggle = () => {
  const { t } = useTranslation('sideBar');
  const { Icon, set, colorScheme } = useTheme();

  useLogger('theme', { colorScheme });
  return (
    <Switch
      onChange={() => {
        set();
      }}
      style={{
        transition: '0.6s ease',
      }}
      aria-label={t('dark_theme')}
      label={t('dark_theme')}
      checked={colorScheme === 'dark'}
      offLabel={<Icon size={16} color="yellow" />}
      onLabel={<Icon color={'black'} size={16} />}
    />
  );
};
