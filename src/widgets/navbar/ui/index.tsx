import { AppShellNavbarWidget } from './app-shell-navbar.tsx';
import type { NavbarTabSlot } from '../types/tab-slot';

export const AppShellNavbar = ({ tabs }: { tabs: NavbarTabSlot[] }) => (
  <AppShellNavbarWidget tabs={tabs} />
);

export { AppShellNavbarWidget };
