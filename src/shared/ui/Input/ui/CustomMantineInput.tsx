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
  return (
    <Input.Wrapper error={er ? er.full : ''}>
      <TextInput
        radius={'sm'}
        styles={{
          input: {
            backgroundColor: theme.colors.dark[8],
          },
        }}
        {...props}
      />
    </Input.Wrapper>
  );
};
