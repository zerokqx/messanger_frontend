import type { PrivateChatHistoryData } from './orval/chat-private-service/chat-private-service.schemas';
import { Dexie, type EntityTable } from 'dexie';
export type DexieUserId = string;
export type DexieChatId = string;

export interface Chat {
  user_id: DexieUserId;
  chat_id: DexieChatId;
}

export type MessageItem = PrivateChatHistoryData['items'][number];

export interface Message extends MessageItem {
  id: number;
}

export interface Images {
  id: string;
  blob: Blob;
  size?: string;
  sourceUrl: string;
}

export const db = new Dexie('yobble') as Dexie & {
  chats: EntityTable<Chat, 'user_id'>;
  messages: EntityTable<Message, 'id'>;
  images: EntityTable<Images, 'id'>;
};

db.version(1).stores({
  chats: 'user_id, chat_id',
  messages: '++id, chat_id, created_at',
  images: 'id',
});

export const delteDb = async () => {
  if (db.isOpen()) db.close();
  await db.delete();
};

export const reInitDb = async () => {
  if (db.isOpen()) db.close();
  await Promise.all([db.delete(), db.open()]);
};
