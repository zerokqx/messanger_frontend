import { Flex, Divider, useMantineTheme } from '@mantine/core';
import type { InfoBlockProp } from '../types/infoBlock.type';
import { useBorder } from '@/shared/lib/settings';

export const InfoBlock = ({
  inline,
  accent,
  icon,
  children,
}: InfoBlockProp) => {
  const Icon = icon;
  const bd = useBorder('0.1rem');
  const t = useMantineTheme();
  return (
    <Flex
      gap={'md'}
      p={'md'}
      h={'3rem'}
      direction={'column'}
      mt={'md'}
      styles={{
        root: {
          position: 'relative',
          cursor: 'pointer',
        },
      }}
    >
      <Flex
        {...(accent && {
          bg: t.colors.dark[9],
          bdrs: 'xl',
          p: 'md',
        })}
        bd={bd}
        align={'center'}
        gap={'md'}
        direction={'row'}
        styles={{
          root: {
            cursor: 'pointer',
          },
        }}
      >
        {Icon && Icon}
        {children}
      </Flex>

      {!inline && <Divider />}
    </Flex>
  );
};
