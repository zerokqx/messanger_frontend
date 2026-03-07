import {
  Affix,
  Group,
  Loader,
  rem,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

interface LoadingIndicatorHeaderProps {
  loading?: boolean;
}
export const LoadingIndicatorHeader = ({
  loading,
}: LoadingIndicatorHeaderProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <AnimatePresence mode="popLayout">
      {loading && (
        <Group
          style={{ zIndex: 100000 }}
          pos="absolute"
          top={0}
          left={0}
          justify="space-between"
          w="100%"
          h={rem(60)}
          pr={'md'}
          pl={'md'}
          bg={colorScheme === 'dark' ? 'dark.9' : 'gray.3'}
          renderRoot={(props) => (
            <m.div
              key={'loading-overlay-31dawkl'}
              exit={{
                y: '-100px',
              }}
              animate={{ y: 0 }}
              {...props}
            />
          )}
        >
          <Text opacity={0.7}>Обновление...</Text>
          <Loader size={16} />
        </Group>
      )}
    </AnimatePresence>
  );
};
