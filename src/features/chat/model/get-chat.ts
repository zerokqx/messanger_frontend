import { db } from '@/shared/api';
import { useRouterState } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import z from 'zod';

export const useGetChat = () => {
  const userId = useRouterState({ select: (s) => s.location.hash });
  const chatId = useLiveQuery(() => db.chats.get(userId), [userId])?.chat_id;
  const isValidChatId = z.uuid().safeParse(chatId).data;
  return {
    userId,
    chatId: isValidChatId,
  };
};
