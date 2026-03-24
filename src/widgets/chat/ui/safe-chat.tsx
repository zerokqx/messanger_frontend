import { useRouterState } from '@tanstack/react-router';
import { useVisibilityChat } from '../model';
import { ChatWidget, type ChatWidgetProps } from './chat.tsx';


export const SafeChat = (props: ChatWidgetProps) => {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const visibility = useVisibilityChat((s) => s.data);
  return hash && visibility && <ChatWidget {...props}/>;
};
