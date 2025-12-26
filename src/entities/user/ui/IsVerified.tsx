import { Flex, Text, useMantineTheme } from '@mantine/core';
import { X } from 'lucide-react';
import { useUserStore } from '../model';

export const IsVerified = () => {
  const isVerified = useUserStore((s) => s.data.is_verified);
  const red = useMantineTheme().colors.red[8];
  return (
    <Flex direction={'row'} align={'center'}>
      {isVerified ? (
        <Text>Верифицирован</Text>
      ) : (
        <>
          <Text>Не верифицирован</Text>
          <X color={red} />
        </>
      )}
    </Flex>
  );
};
