import { useBorder } from '@/widgets/Settings';
import {
  Input,
  TextInput,
  useMantineTheme,
  type TextInputProps,
} from '@mantine/core';
import { useState } from 'react';

export const CustomMantineInput = ({ ...props }: TextInputProps) => {
  const [er] = useState<{
    short: string;
    full: string;
  } | null>(null);
  const theme = useMantineTheme();
  const bd = useBorder('0.1rem', 'default', 'none');
  return (
    <Input.Wrapper error={er ? er.full : ''}>
      <TextInput
        styles={{
          input: {
            border: bd,
            background: theme.colors.dark[9],
          },
        }}
        {...props}
      />
    </Input.Wrapper>
  );
};
