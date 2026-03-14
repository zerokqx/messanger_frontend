import { Session } from '../session';
import { ActionIcon, Button, Group, Text, Tooltip } from '@mantine/core';
import { CircleQuestionMark } from 'lucide-react';
import { useToggle } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import type { SessionCurrentProps } from '../session-instance.types';
import { useSesionActionsContext } from '../../model';

export const SessionCurrentCard = ({
  session,
  singleSession = false,
}: SessionCurrentProps) => {
  const [t] = useTranslation('session');
  const [tooltipStatus, tooltipToggle] = useToggle();
  const actions = useSesionActionsContext();

  return (
    <Session session={session}>
      <Session.Header>
        <Group justify="space-between" align="center" mb={4}>
          <Session.UserAgent />
          <Group gap={6}>
            <Session.CurrentBadge />
            <Session.ThisDevice />
          </Group>
        </Group>
        <Session.Ip />
      </Session.Header>
      <Session.Body withDivider>
        <Session.CreatedAt />
        <Session.LastRefresh />
      </Session.Body>
      <Session.Footer>
        <Session.Trusted trusted={false}>
          <Tooltip
            w={220}
            opened={tooltipStatus}
            multiline
            events={{ hover: false, focus: false, touch: false }}
            label={t('untrasted_session')}
          >
            <Group gap="xs" wrap="nowrap">
              <ActionIcon
                onClick={() => {
                  tooltipToggle();
                }}
                color="orange"
                bdrs="xl"
                variant="light"
              >
                <CircleQuestionMark size={16} />
              </ActionIcon>
              <Text c="orange" size="sm">
                Недоверенная сессия
              </Text>
            </Group>
          </Tooltip>
        </Session.Trusted>

        {!singleSession && (
          <Session.Trusted trusted>
            <Button
              onClick={() => {
                actions.onRevokeAll();
              }}
              radius="xl"
              variant="filled"
              fullWidth
            >
              {t('close_all_sessions')}
            </Button>
          </Session.Trusted>
        )}
      </Session.Footer>
    </Session>
  );
};
