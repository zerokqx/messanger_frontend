
export { socket } from './socket.ts';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});
export { $api } from './repository/$api.ts';

export {
  type AllPathsByMethod,
  type HttpMethod,
  type TypedQueryKey,
  typedQueryKey,
} from './typed-querykey.ts';
export {
  db,
  type Chat,
  type Message,
  type MessageItem,
  type DexieChatId,
  type DexieUserId,
} from './db.ts';
