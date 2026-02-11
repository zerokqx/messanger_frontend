import type {
  TabsDeclaration,
  TabsDeclarationKeys,
} from '@/shared/ui/query-tabs';
import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { type ReactNode } from 'react';

export interface QuickLink {
  label: string;
  icon: ReactNode;
  value: string;
}
interface QuickLinksProps<QuickLinksGeneric extends QuickLink[]> {
  onClickLink?: (v: QuickLinksGeneric[number]['value']) => void;
  links: QuickLinksGeneric;
  activeValue?: string;
}

export type QuickLinksData<QueryKey extends TabsDeclarationKeys> = {
  label: string;
  value: TabsDeclaration[QueryKey];
  icon: ReactNode;
};
export const QuickLinks = <QuickLinksGeneric extends QuickLink[]>({
  activeValue,
  onClickLink,
  links,
}: QuickLinksProps<QuickLinksGeneric>) => {
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
            onClick={() => {
              onClickLink?.(t.value);
            }}
          >
            {t.icon}
          </ActionIcon>
        );
      })}
    </Group>
  );
};
