import { useTokenStore } from '@/entities/token';
import { CustomMantineButton } from '@/shared/ui/Button';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { notifications } from '@mantine/notifications';
import { useRef } from 'react';

export const IndexPage = () => {
  const { clearStore } = useTokenStore();
  const { setToken } = useTokenStore();
  const ref = useRef('');
  return (
    <>
      <ThemeToggle />
      <CustomMantineButton onClick={clearStore}>
        Clear access
      </CustomMantineButton>
      <CustomMantineButton
        onClick={() =>
          notifications.show({
            title: 'Test',
            message: 'Test',
          })
        }
      >
        Get Notify
      </CustomMantineButton>

      <input
        name="inp"
        onChange={(e) => {
          ref.current = e.target.value;
        }}
      />

      <CustomMantineButton
        onClick={() => {
          setToken(ref.current);
        }}
      >
        Submit
      </CustomMantineButton>
      <CustomMantineButton
        onClick={() => {
          console.log(ref.current);
        }}
      >
        Log
      </CustomMantineButton>
    </>
  );
};
