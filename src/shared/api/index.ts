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

export * as AchievementServiceSchemas from './orval/achievement-service/achievement-service.schemas';
export * as AuthServiceSchemas from './orval/auth-service/auth-service.schemas';
export * as CallServiceSchemas from './orval/call-service/call-service.schemas';
export * as ChatPrivateServiceSchemas from './orval/chat-private-service/chat-private-service.schemas';
export * as FeedServiceSchemas from './orval/feed-service/feed-service.schemas';
export * as ProfileServiceSchemas from './orval/profile-service/profile-service.schemas';
export * as ProfileServiceV2Schemas from './orval/profile-service-v2/profile-service-v2.schemas';
export * as RatingServiceSchemas from './orval/rating-service/rating-service.schemas';
export * as StorageServiceSchemas from './orval/storage-service/storage-service.schemas';
export * as UserServiceSchemas from './orval/user-service/user-service.schemas';
