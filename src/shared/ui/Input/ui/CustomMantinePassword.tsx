import { useBorder } from '@/widgets/Settings';
import {
  PasswordInput,
  useMantineTheme,
  type PasswordInputProps,
} from '@mantine/core';

export const CustomMantinePassword = ({ ...props }: PasswordInputProps) => {
  const bd = useBorder('0.1rem');

  const theme = useMantineTheme();
  return (
    <PasswordInput
      styles={{
        input: {
          border: bd,

          background: theme.colors.dark[9],
        },
      }}
      {...props}
    />
  );
};
