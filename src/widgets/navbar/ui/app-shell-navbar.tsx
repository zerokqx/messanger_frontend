import { type ReactNode } from 'react';
import { AppShellNavbar } from '@mantine/core';
import { NavbarHeader } from './navbar-header';

interface AppShellNavbarWidgetProps {
  children?: ReactNode;
}

export const AppShellNavbarWidget = ({
  children,
}: AppShellNavbarWidgetProps) => {
  return (
    <AppShellNavbar style={{ overflow: 'auto', overflowX: 'hidden' }}>
      {/* <TabsNavigate */}
      {/*   queryKey="tnavbar" */}
      {/*   children={({ push }) => ( */}
      {/*     <NavbarHeader */}
      {/*       input={{ */}
      {/*         onFocus: () => { */}
      {/*           push('search'); */}
      {/*         }, */}
      {/*       }} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
      {children}
    </AppShellNavbar>
  );
};
