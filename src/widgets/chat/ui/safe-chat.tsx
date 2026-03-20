import { useRouterState } from '@tanstack/react-router';
import { useVisibilityChat } from '../model';
import { ChatWidget } from './chat.tsx';

export const SafeChat = () => {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const visibility = useVisibilityChat((s) => s.data);
  return hash && visibility && <ChatWidget />;
};
