import { Flex, Divider, useMantineTheme } from '@mantine/core';
import type { InfoBlockProp } from '../types/infoBlock.type';
import { useBorder } from '@/widgets/Settings';

export const InfoBlock = ({
  inline,
  accent,
  icon,
  flexProps,
  children,
}: InfoBlockProp) => {
  const Icon = icon;
  const bd = useBorder('0.1rem');
  const t = useMantineTheme();
  return (
    <Flex
      gap={'md'}
      direction={'column'}
      mt={'md'}
      styles={{
        root: {
          cursor: 'pointer',
        },
      }}
    >
      <Flex
        {...(accent && {
          bg: t.black,
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
        <Flex {...flexProps}>{children}</Flex>
      </Flex>

      {!inline && <Divider />}
    </Flex>
  );
};
