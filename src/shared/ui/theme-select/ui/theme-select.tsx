import {
  ActionIcon,
  Group,
  Select,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, SunMoon } from 'lucide-react';

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

  const onChange = (value: string | null) => {
    if (!value) {
      return;
    }

    if (value === 'auto' || value === 'dark' || value === 'light') {
      setColorScheme(value);
    }
  };

  const data = [
    { value: 'auto', label: t('theme-option-auto') },
    { value: 'dark', label: t('theme-option-dark') },
    { value: 'light', label: t('theme-option-light') },
  ];
  const Icon = getThemeIcon(colorScheme);
  return (
    <Select
      variant="filled"
      aria-label="Theme"
      allowDeselect={false}
      value={colorScheme}
      onChange={onChange}
      data={data}
      renderOption={({ option }) => {
        const Icon = getThemeIcon(option.value);

        return (
          <Group gap="sm">
            <ActionIcon variant="transparent" size={'xs'}>
              <Icon />
            </ActionIcon>
            <Text>{option.label}</Text>
          </Group>
        );
      }}
      leftSection={
        <ActionIcon variant="transparent">
          <Icon />
        </ActionIcon>
      }
    />
  );
};
