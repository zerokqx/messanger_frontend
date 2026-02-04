import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useResponsive = () => {
  const t = useMantineTheme();
  const desktop = useMediaQuery(`(min-width: ${t.breakpoints.xs})`);

  return {
    mobile: !desktop,
    desktop,
  };
};
