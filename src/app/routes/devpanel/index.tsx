import { DevpanelPage } from '@/pages/devpanel';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/devpanel/')({
  component: DevpanelPage,
});
