import { ActionIcon, Box, Paper, Stack, Text, Textarea } from '@mantine/core';
import { ArrowUp, CornerDownLeft } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import type { ChatInputProps } from './types';

const isEmptyValue = (value: string) => value.trim().length === 0;

export const ChatInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isPending = false,
  placeholder = 'Напишите сообщение...',
  inputProps,
}: ChatInputProps) => {
  const isDisabled = disabled || isPending;
  const canSubmit = !isDisabled && !isEmptyValue(value);

  const handleSubmit = () => {
    if (!canSubmit) return;
    void onSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) return;

    event.preventDefault();
    handleSubmit();
  };

  return (
    <Paper
      withBorder
      radius="xl"
      p="sm"
      shadow="sm"
      style={{
        backdropFilter: 'blur(10px)',
      }}
    >
      <Stack gap="xs">
        <Textarea
          autosize
          minRows={1}
          maxRows={6}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          placeholder={placeholder}
          variant="unstyled"
          styles={{
            input: {
              padding: '0.4rem 0.2rem',
              fontSize: '0.95rem',
              lineHeight: 1.5,
            },
          }}
          {...inputProps}
        />

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <Text c="dimmed" size="xs" style={{ display: 'flex', gap: '0.35rem' }}>
            <CornerDownLeft size={14} />
            Enter для отправки, Shift + Enter для новой строки
          </Text>

          <ActionIcon
            radius="xl"
            size="lg"
            variant="filled"
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={isPending}
            aria-label="Отправить сообщение"
          >
            <ArrowUp size={18} />
          </ActionIcon>
        </Box>
      </Stack>
    </Paper>
  );
};
