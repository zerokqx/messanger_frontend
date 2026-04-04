import { ActionIcon, Group, Stack, Textarea } from '@mantine/core';
import { useSendMessage } from '@/features/chat';
import type { KeyboardEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Send } from 'lucide-react';
import { lightDark } from '@/shared/lib/light-dark';
import { AnimatePresence, m } from 'motion/react';
import { useChatSession } from '../model/chat-session-context.ts';
import type { ChatInputProps } from './types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  chatInputValidation,
  MAX_MESSAGE_LENGHT,
} from '../model/chat-input-validations.ts';
import { useTranslation } from 'react-i18next';
import { CharCounter } from '@/shared/ui/chat-counter/index.ts';

export interface ChatInputFormState {
  content: string;
}
const isEmptyValue = (value: string) => value.trim().length === 0;

export const ChatInput = ({ inputProps }: ChatInputProps) => {
  const { t } = useTranslation('chat');
  const chatId = useChatSession((state) => state.chatId);
  const { mutateAsync: sendMessage, isPending } = useSendMessage();
  const { handleSubmit, register, watch, reset, setFocus, setValue } =
    useForm<ChatInputFormState>({
      resolver: zodResolver(chatInputValidation),
      defaultValues: {
        content: '',
      },
    });
  const value = watch('content', '');
  const canSubmit =
    !isPending && !isEmptyValue(value) && value.length <= MAX_MESSAGE_LENGHT;
  const submit: SubmitHandler<ChatInputFormState> = async ({ content }, e) => {
    e?.preventDefault();
    if (!chatId || isEmptyValue(content)) return;
    setValue('content', '', {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    void sendMessage({
      data: {
        chat_id: chatId,
        message_type: ['text'],
        content,
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    void handleSubmit(submit)();
  };

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
      <Group
        style={{
          borderTop: `1px solid ${lightDark('gray.4', 'dark.4')}`,
        }}
        justify="space-between"
        mt="sm"
        wrap="nowrap"
        w="100%"
        p="sm"
      >
        <Textarea
          w="100%"
          autosize
          minRows={1}
          maxRows={6}
          placeholder={t('input-placeholder')}
          variant="unstyled"
          {...inputProps}
          {...register('content')}
          onKeyDown={handleKeyDown}
          styles={{
            input: {
              padding: '0.4rem 0.2rem',
              fontSize: '0.95rem',
              lineHeight: 1.5,
            },
          }}
        />

        <Stack>
          <CharCounter
            invalidColor="red"
            max={MAX_MESSAGE_LENGHT}
            currentCount={value.length}
          />
          <AnimatePresence>
            {canSubmit && (
              <m.div
                key="send"
                initial={{ scale: 0.85, opacity: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <ActionIcon
                  radius="xl"
                  size="lg"
                  variant="filled"
                  type="submit"
                  loading={isPending}
                  aria-label={t('send-message')}
                >
                  <Send size={18} />
                </ActionIcon>
              </m.div>
            )}
          </AnimatePresence>
        </Stack>
      </Group>
    </form>
  );
};
