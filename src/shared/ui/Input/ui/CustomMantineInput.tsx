import { Input, TextInput, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import type { CustomMantineInputProps } from '..';

export const CustomMantineInput = ({ ...props }: CustomMantineInputProps) => {
  const [er] = useState<{
    short: string;
    full: string;
  } | null>(null);
  const theme = useMantineTheme();
  return (
    <Input.Wrapper w="max-content" error={er ? er.full : ''}>
      <TextInput
        {...props}
        w={'20rem'}
        radius={'sm'}
        styles={{
          input: {
            backgroundColor: theme.colors.dark[8],
          },
        }}
      />
    </Input.Wrapper>
  );
};
