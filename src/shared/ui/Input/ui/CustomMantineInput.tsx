import { useBorder } from '@/widgets/Settings';
import { TextInput, useMantineTheme, type TextInputProps } from '@mantine/core';

export const CustomMantineInput = ({ ...props }: TextInputProps) => {
  const theme = useMantineTheme();
  const bd = useBorder('0.1rem');
  return (
    <TextInput
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
