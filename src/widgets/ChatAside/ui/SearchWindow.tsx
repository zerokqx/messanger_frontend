import { useSearchStore } from '@/features/search';
import type { components } from '@/shared/types/v1';
import { useBorder } from '@/widgets/Settings';
import { Avatar, CloseButton, Flex, Text } from '@mantine/core';
import { useAnimate } from 'motion/react';
import { useLogger } from 'react-use';

export const SearchWindow = () => {
  const bd = useBorder('0.1rem');
  const [scope, animate] = useAnimate();
  const users = useSearchStore((s) => s.users);
  useLogger('SearchWindow');

  return (
    users &&
    users.length > 0 && (
      <Flex p={'md'} w={'100%'} ref={scope} direction={'column'} gap={'md'}>
        {users.map((user, index) => {
          const { login } =
            user.profile as components['schemas']['ProfileByUserIdData'];
          return (
            <Flex
              gap={'inherit'}
              align={'center'}
              bd={bd}
              direction={'row'}
              key={index.toString() + user.user_id}
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
        <CloseButton />
      </Flex>
    )
  );
};
