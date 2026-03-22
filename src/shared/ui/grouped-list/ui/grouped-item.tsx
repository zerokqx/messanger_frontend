import { clsx } from 'clsx';
import clases from './grouped-list.module.css';
import { ActionIcon, factory, Group, Stack, Text } from '@mantine/core';
import type { GroupedItemProps } from './types';
import { upperCase } from 'lodash';
import useRipple from 'useripple';
import { lightDark } from '@/shared/lib/light-dark';

const ActionIconCustom = ActionIcon.withProps({
  size: 'lg',
  bdrs: 'lg',
  variant: 'light',
  style: {
    pointerEvents: 'none',
  },
});

export const GroupedItem = factory<{
  props: GroupedItemProps;
  ref: HTMLDivElement;
}>(
  ({
    children,
    rightSection,
    leftSection,
    fallback,
    leftSectionColor,
    undefinedStyles = true,
    label,
    hideUndefined = true,
    isText = true,
    className,
    ...props
  }) => {
    const [addRipple, ripples] = useRipple({
      background: lightDark('gray.4', 'dark.3'),
    });
    return !children && hideUndefined ? null : (
      <Group
        style={{
          overflow: 'hidden',
        }}
        pos={'relative'}
        onClick={addRipple}
        className={clsx(clases.element, className)}
        p={'xs'}
        justify="space-between"
        {...props}
      >
        {ripples}
        <Group wrap="nowrap" align="center">
          {leftSection && (
            <ActionIconCustom
              disabled={!children && undefinedStyles}
              color={leftSectionColor}
            >
              {leftSection}
            </ActionIconCustom>
          )}
          <Stack justify="start" gap={'xs'}>
            {label && (
              <Text size="xs" fw={700} c="dimmed">
                {upperCase(label)}
              </Text>
            )}
            {children && isText ? (
              <Text
                miw={0}
                style={{
                  overflowWrap: 'anywhere',
                }}
              >
                {children}
              </Text>
            ) : (
              children
            )}
            {!children && fallback}
          </Stack>
        </Group>
        {rightSection}
      </Group>
    );
  }
);
