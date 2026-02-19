import type { ReactNode } from 'react';

interface TabsProps {
  children?: ReactNode;
}
interface TabProps {
  children?: ReactNode,
  keepMounted?: boolean,

}
interface TabsComponent {
  (props: TabsProps): ReactNode;
  Tab: (props: TabProps) => ReactNode

}

export const Tab: TabsComponent['Tab'] = () => {};

export const Tabs: TabsComponent = () => {};
