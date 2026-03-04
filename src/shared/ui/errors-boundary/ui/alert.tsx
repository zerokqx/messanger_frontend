import {
  Alert,
  Button,
  Group,
  Stack,
  Text,
  CopyButton,
} from '@mantine/core';
import { AlertTriangle, RefreshCcw, Copy } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

type ErrorAlertProps = FallbackProps & {
  title?: string;
  showDetails?: boolean;
};

export function ErrorAlert({
  error,
  resetErrorBoundary,
  title,
  showDetails = true,
}: ErrorAlertProps) {
  const [t] = useTranslation('errors-boundary');
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : t('unknown-error');

  const details =
    error instanceof Error
      ? error.stack
        ? `${error.message}\n\n${error.stack}`
        : error.message
      : String(error);

  return (
    <Alert
      icon={<AlertTriangle />}
      color="red"
      title={title ?? t('title')}
      variant="light"
    >
      <Stack gap="sm">
        <Text size="sm">{message}</Text>

        <Group justify="space-between">
          <Button
            leftSection={<RefreshCcw size={16} />}
            variant="light"
            color="red"
            onClick={resetErrorBoundary}
          >
            {t('retry')}
          </Button>

          {showDetails && (
            <CopyButton value={details}>
              {({ copied, copy }) => (
                <Button
                  leftSection={<Copy size={16} />}
                  variant="subtle"
                  color={copied ? 'green' : 'gray'}
                  onClick={copy}
                >
                  {copied ? t('copied') : t('copy')}
                </Button>
              )}
            </CopyButton>
          )}
        </Group>
      </Stack>
    </Alert>
  );
}
