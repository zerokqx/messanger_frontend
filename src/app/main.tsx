import type { AuthContextTypes } from '@/shared/model/auth-provider-context/context.type';
import '@/shared/styles/root.css';
import './lucide.css';
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { routeTree } from './route-tree.gen';
import { Wrapper } from './wrapper';
export const router = createRouter({
  routeTree,
  defaultPreload: 'viewport',
  scrollRestoration: true,
  context: {
    auth: {} as unknown as AuthContextTypes,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    RouterContext: {
      auth: AuthContextTypes;
    };
  }
}

const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Wrapper />);
}
