// Copyright (c) 2026 zerokqx
// SPDX-License-Identifier: MIT
import { ChatContainer } from './chat-container';
import { MessageText } from './message-text-type';
import { SystemMessage } from './system-message';
import type { ChatCompound } from './types';

export const Chat = Object.assign(ChatContainer, {
  Message: MessageText,
  SystemMessage,
}) as ChatCompound;
