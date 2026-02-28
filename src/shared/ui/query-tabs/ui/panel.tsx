import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { type ComponentProps, type MouseEvent, type ReactNode } from 'react';
import { useTabsApi } from '../model';

interface PanelComponentProps {
  variant: string;
  radius: string;
  size: string;
  onClick: ComponentProps<'button'>['onClick'];
  children?: ReactNode;
  onMouseEnter?: () => void;
}
export interface PanelProps {
  component?: (props: PanelComponentProps) => ReactNode;
  onClickAnyItem?: (v: string, e: MouseEvent<HTMLButtonElement>) => void;
  active?: (v: string) => boolean;
  withStyleAtActive?: boolean;
  data: {
    onHover?: () => void;
    icon?: ReactNode;
    value: string;
    label?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  }[];
}

export const PanelContainer = Group.withProps({
  bdrs: 'xl',
  p: 'xs',
  justify: 'space-evenly',
});
export const Panel = ({
  withStyleAtActive = true,
  component = ActionIcon,
  data,
  active,
  onClickAnyItem,
}: PanelProps) => {
  const { colorScheme } = useMantineColorScheme();
  const [api, state] = useTabsApi();
  const current = state.current;
  const isActive = active ?? ((value: string) => current === value);

  return (
    <PanelContainer  bg={colorScheme === 'dark' ? 'dark' : 'gray.1'}>
      {data.map(({ value, icon,onHover, onClick }) => {
        const Component = component;
        return (
          <Component
            key={value}
            variant={
              isActive(value)
                ? withStyleAtActive
                  ? 'filled'
                  : 'light'
                : 'light'
            }
            radius="xl"
            size="lg" onMouseEnter={onHover}
            onClick={(e) => {
              api.push(value);
              onClickAnyItem?.(value, e);
              onClick?.(e);
            }}
          >
            {icon}
          </Component>
        );
      })}
    </PanelContainer>
  );
};
