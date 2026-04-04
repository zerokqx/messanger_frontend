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
export {
  ACCESS_COOKIE_NAME,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  type RefreshTokenResponse,
  getCookie,
  hasValidAccessCookie,
  isClientSessionAuthorized,
  isPlaceholderAccessToken,
} from './auth-session.ts';
