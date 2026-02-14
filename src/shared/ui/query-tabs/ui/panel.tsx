import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { useTabs } from '../lib';
import { useSharedQueryName } from '../model';
import type {
  ComponentProps,
  ComponentType,
  MouseEvent,
  ReactNode,
} from 'react';
import { useApiTabs } from '../model/api-context';

interface PanelComponentProps {
  variant: string;
  radius: string;
  size: string;
  onClick: ComponentProps<'button'>['onClick'];
  children?: ReactNode;
}
interface PanelProps {
  component: (props: PanelComponentProps) => ReactNode;
  onClickAnyItem?: (v: string, e: MouseEvent<HTMLButtonElement>) => void;
  active?: (v: string) => boolean;
  data: {
    icon?: ReactNode;
    value: string;
    label?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  }[];
}

export const Panel = ({
  component,
  data,
  active,
  onClickAnyItem,
}: PanelProps) => {
  const { colorScheme } = useMantineColorScheme();
  const [queryName] = useSharedQueryName();
  const api = useApiTabs();

  return (
    <Group
      bg={colorScheme === 'dark' ? 'dark' : 'gray.1'}
      p={'xs'}
      justify="space-evenly"
    >
      {data.map(({ value, icon, onClick }) => {
        const Component = component;
        return (
          <Component
            key={value}
            variant={active?.(value) ? 'filled' : 'light'}
            radius="xl"
            size="lg"
            onClick={(e) => {
              onClickAnyItem?.(value, e);
              onClick?.(e);
            }}
          >
            {icon}
          </Component>
        );
      })}
    </Group>
  );
};
