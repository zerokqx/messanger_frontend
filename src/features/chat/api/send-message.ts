import { $chatPrivateService } from '@/shared/api/generated';
import type { components } from '@/shared/types/v1';

export type Message = components['schemas']['PrivateMessageSendRequest']

export const useSendMessage = () => {
  return $chatPrivateService.useMutation('post', '/message/send');
};
