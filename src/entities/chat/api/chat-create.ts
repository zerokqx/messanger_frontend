import { $api } from '@/shared/api';

export const useChatCreate = () => {
  return $api['chat/private'].jwt.useMutation('post', '/create');
};
