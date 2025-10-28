import { useBorder } from '@/widgets/Settings';
import { PasswordInput, type InputProps } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';

export const CustomMantinePassword = () => {
  const bd = useBorder('0.1rem');
  return (
    <PasswordInput
      styles={{
        input: {
          border: bd,
        },
      }}
    />
  );
};
