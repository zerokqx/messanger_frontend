export { socket } from './socket.ts';
export type {
  SocketEvent,
  ChatPrivateMessagePayload,
  ChatPrivateNewMessageSocketEvent,
} from './socket.types.ts';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({});
export {
  delteDb,
  reInitDb,
  db,
  type Chat,
  type Message,
  type MessageItem,
  type DexieChatId,
  type DexieUserId,
} from './db.ts';
export * from './socket.types.ts';
export { getCookie, ACCESS_COOKIE_NAME } from './axios-client.ts';
