import type {
  TabsDeclaration,
  TabsDeclarationKeys,
} from '@/shared/ui/query-tabs';
import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { type MouseEvent, type ReactNode } from 'react';

export interface QuickLinkItem<QueryKey extends TabsDeclarationKeys> {
  onClick?: (
    v: TabsDeclaration[QueryKey],
    e: MouseEvent<HTMLButtonElement>
  ) => void;
  icon: ReactNode;
  value: TabsDeclaration[QueryKey];
}

interface QuickLinksProps<QueryKey extends TabsDeclarationKeys> {
  activeValue: string;
  links: QuickLinkItem<QueryKey>[];
  onClickAnyLink?: (
    v: TabsDeclaration[QueryKey],
    e: MouseEvent<HTMLButtonElement>
  ) => void;
}

export const QuickLinks = <QueryKey extends TabsDeclarationKeys>({
  activeValue,
  onClickAnyLink,
  links,
}: QuickLinksProps<QueryKey>) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Group
      bg={colorScheme === 'dark' ? 'dark' : 'gray.1'}
      p={'xs'}
      justify="space-evenly"
    >
      {links.map((t) => {
        const active = activeValue === t.value;
        return (
          <ActionIcon
            key={t.value}
            variant={active ? 'filled' : 'light'}
            radius="xl"
            size="lg"
            onClick={(e) => {
              onClickAnyLink?.(t.value, e);
              t.onClick?.(t.value, e);
            }}
          >
            {t.icon}
          </ActionIcon>
        );
      })}
    </Group>
  );
};
