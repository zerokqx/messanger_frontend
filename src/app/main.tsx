import './lucide.css';
import "./index.css"
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
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('@/shared/api/msw.browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  void enableMocking()
  .catch((error:unknown) => {
      console.error('[MSW] Failed to start worker', error);
    })
    .finally(() => {
      root.render(<Wrapper />);
    });
}
