import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';

export type Message = components['schemas']['PrivateMessageSendRequest']

export const useSendMessage = () => {
  return $api['chat/private'].jwt.useMutation('post', '/send');
};
