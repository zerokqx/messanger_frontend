import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { useBorder } from '@/widgets/Settings';
import { Avatar, Flex, Text } from '@mantine/core';
import { useLogger } from 'react-use';

export const SearchWindow = () => {
  const bd = useBorder('0.1rem');
  const users = useSearchStore.useUsers();
  useLogger('SearchWindow');

  return (
    users &&
    users.length > 0 && (
      <Flex p={'md'} w={'inherit'} direction={'column'} gap={'md'}>
        {users.map((user) => {
          const { login } =
            user.profile as components['schemas']['ProfileByUserIdData'];
          return (
            <Flex
              gap={'inherit'}
              align={'center'}
              bd={bd}
              direction={'row'}
              key={login}
              w={'inherit'}
              bdrs={'xl'}
              p={'xs'}
            >
              <Avatar name={login ?? 'Anonymous'} />
              <Text truncate="end" w={'inherit'}>
                {login}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    )
  );
};
