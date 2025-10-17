import { useTokenStore } from '@/entities/token';
import { CustomMantineButton } from '@/shared/ui/Button';
import { useRef } from 'react';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { notifications } from '@mantine/notifications';
import { CustomMantineInput } from '@/shared/ui/Input';
import { Flex } from '@mantine/core';
export const DevpanelPage = () => {
  const { clearStore } = useTokenStore();
  const { setToken } = useTokenStore();
  const ref = useRef('');
  return (
    <>
      <Flex direction={'row'} gap={'md'} wrap={'wrap'}>
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

        <CustomMantineInput
          placeholder="Custom access"
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
      </Flex>
    </>
  );
};
