import { Group, Select, Text, useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { theme } from '@/app/mantine';

const getThemeIcon = (value: string) => {
  if (value === 'auto') {
    return SunMoon;
  }
  if (value === 'dark') {
    return Moon;
  }

  return Sun;
};

export const ThemeSelect = () => {
  const { t } = useTranslation('settings-tab');
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const onChange = useCallback(
    (value: string | null) => {
      if (!value) {
        return;
      }

      if (value === 'auto' || value === 'dark' || value === 'light') {
        setColorScheme(value);
      }
    },
    [setColorScheme]
  );

  const data = useMemo(
    () => [
      { value: 'auto', label: t('theme-option-auto') },
      { value: 'dark', label: t('theme-option-dark') },
      { value: 'light', label: t('theme-option-light') },
    ],
    [t]
  );

  return (
    <Select
      aria-label="Theme"
      allowDeselect={false}
      value={colorScheme}
      onChange={onChange}
      data={data}
      renderOption={({ option }) => {
        const Icon = getThemeIcon(option.value);

        return (
          <Group gap="sm">
            <Icon size={16} />
            <Text>{option.label}</Text>
          </Group>
        );
      }}
      leftSection={getThemeIcon(colorScheme)({})}
    />
  );
};
