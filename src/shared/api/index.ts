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
  delteDb,reInitDb,
  db,
  type Chat,
  type Message,
  type MessageItem,
  type DexieChatId,
  type DexieUserId,
} from './db.ts';
<<<<<<< Updated upstream
export * from "./socket.types.ts"
||||||| Stash base
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
=======
export * from './socket.types.ts';
export {
  ACCESS_COOKIE_NAME,
  CLIENT_TYPE,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  type RefreshTokenResponse,
  getCookie,
  getSessionStoreToken,
  getSocketAuthToken,
  hasValidAccessCookie,
  isClientSessionAuthorized,
  isPlaceholderAccessToken,
  normalizeAccessToken,
} from './auth-session.ts';
export {
  bootstrapClientSession,
  getAuthHeaders,
  refreshClientSession,
  resetClientSession,
  syncClientSession,
} from './client-session.ts';
>>>>>>> Stashed changes
