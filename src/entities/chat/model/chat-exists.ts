import { db,  type DexieUserId } from '@/shared/api';

export const chatExists = async (userId: DexieUserId) => {
  return await db.chats.get(userId);
};
