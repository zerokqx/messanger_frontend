export { socket } from './socket.ts';
export type {
  SocketEvent,
  ChatPrivateMessagePayload,
  ChatPrivateNewMessageSocketEvent,
} from './socket.types.ts';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60 * 100000,
    },
  },
});
export {
  db,
  type Chat,
  type Message,
  type MessageItem,
  type DexieChatId,
  type DexieUserId,
} from './db.ts';
export * from "./socket.types.ts"
