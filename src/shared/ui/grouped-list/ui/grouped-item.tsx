import { ActionIcon, factory, Group, Stack, Text } from '@mantine/core';
import type { GroupedItemProps } from './types';
import { upperCase } from 'lodash';

const ActionIconCustom = ActionIcon.withProps({
  size: 'lg',
  bdrs: 'lg',
  variant: 'light',
  style: {
    pointerEvents: 'none',
  },
});

export const GroupedItem = factory<{props: GroupedItemProps,ref: HTMLDivElement}>(
({
  children,
  leftSection,
  rightSection,
  fallback,
  leftSectionColor,
  undefinedStyles = true,
  label,
  isText = true,
}) => {
  return (
    <Group justify="space-between">
      <Group wrap="nowrap" align="flex-start">
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
