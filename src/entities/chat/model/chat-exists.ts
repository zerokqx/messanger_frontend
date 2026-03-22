import { db,  type DexieUserId } from '@/shared/api';

export const chatExists = async (id: DexieUserId) => {
  const chat = await db.chats.get(id);
  return chat;
};
