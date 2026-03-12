import { $api } from '@/shared/api/repository/$api';

export const useSendMessage = () => {
  return $api['chat/private'].jwt.useMutation('post', '/send');
};
