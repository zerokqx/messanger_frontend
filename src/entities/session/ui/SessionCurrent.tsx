import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Grid,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import type { SessionProps } from './Session.types';
import { UserAgentBadge } from './UserAgentBadge';
import { useTranslation } from 'react-i18next';
import { ModalRevoke } from '@/features/session/revoke/ui/ModalRevoke';
import { useToggle } from '@mantine/hooks';
import { trustedSession } from '../model/session-state';
import { useMemo } from 'react';
import { CircleQuestionMark } from 'lucide-react';
export const SessionCurrent = ({
  session,
  onRevokeAll,
}: SessionProps<true>) => {
  const createdAt = new Date(session.created_at);
  const lastRefresh = new Date(session.last_refresh_at);
  const { t } = useTranslation('session');
  const [opened, toggleOpened] = useToggle();
  const [tooltipOpened, toggleTooltip] = useToggle();
  const isTrustedSession = useMemo(
    () => trustedSession(session.created_at),
    [session.created_at]
  );
  return (
    <>
      {isTrustedSession && (
        <ModalRevoke
          onAccept={onRevokeAll}
          session={session}
          opened={opened}
          onClose={toggleOpened}
        />
      )}
      <Grid
        mb={'xl'}
        bd={session.is_current ? '3px solid blue' : '1px solid dark.9'}
        p="xs"
        bdrs="md"
      >
        <Grid.Col span={16}>
          <Text>IP: {session.ip_address}</Text>
        </Grid.Col>{' '}
        <Grid.Col span={'content'}>
          <Badge>Текущая сессия</Badge>
        </Grid.Col>
        <Grid.Col span="content">
          <UserAgentBadge ua={session.user_agent} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Text c="dimmed">
            {t('created_at')} {createdAt.toLocaleDateString()}
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text c="dimmed">
            {t('last_activation')} {lastRefresh.toLocaleDateString()}
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Center>
            {isTrustedSession ? (
              <Button
                onClick={() => {
                  toggleOpened();
                }}
                variant="light"
              >
                Завершить все другие сессии
              </Button>
            ) : (
              <Group bd={'1px solid dark.9'} p={'xs'} bdrs={'lg'}>
                <Text>Недовереная сессия</Text>
                <Tooltip
                  w={'220px'}
                  opened={tooltipOpened}
                  multiline
                  label="Недовереная сесиия - это любая сессия которой меньше 5 дней. Такие сессии в течение 5 дней не могут завершать другие сессии."
                >
                  <ActionIcon
                    onClick={() => {
                      toggleTooltip();
                    }}
                    bdrs={'xl'}
                  >
                    <CircleQuestionMark />
                  </ActionIcon>
                </Tooltip>
              </Group>
            )}
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
};
