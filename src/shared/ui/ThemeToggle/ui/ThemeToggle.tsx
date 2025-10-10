import { ActionIcon } from '@mantine/core';
import { useTheme } from '../hooks/useTheme';
export const ThemeToggle = () => {
  const { Icon, set } = useTheme();

  return (
    <ActionIcon onClick={set}>
      <Icon />
    </ActionIcon>
  );
};
