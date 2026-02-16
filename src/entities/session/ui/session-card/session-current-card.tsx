import { Session } from '../session';
import { ActionIcon, Button, Group, Text, Tooltip } from '@mantine/core';
import { CircleQuestionMark } from 'lucide-react';
import { useToggle } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import type { SessionCurrentProps } from '../session-instance.types';
import { useSesionActionsContext } from '../../model';
export const SessionCurrentCard = ({ session }: SessionCurrentProps) => {
  const [t] = useTranslation('session');
  const [tooltipStatus, tooltipToggle] = useToggle();
  const actions = useSesionActionsContext();
  return (
    <Session session={session}>
      <Session.Header>
        <Group justify="space-between">
          <Session.UserAgent />
          <Session.ThisDevice />
        </Group>
        <Session.Ip />
      </Session.Header>
      <Session.Body withDivider>
        <Session.CreatedAt />
        <Session.LastRefresh />
      </Session.Body>
      <Session.Footer withDivider>
        <Session.Trusted trusted={false}>
          <Tooltip
            w={220}
            opened={tooltipStatus}
            multiline
            events={{ hover: false, focus: false, touch: false }}
            label={t('untrasted_session')}
          >
            <Group>
              <ActionIcon
                onClick={() => {
                  tooltipToggle();
                }}
                color="orange"
                bdrs={'xl'}
              >
                <CircleQuestionMark />
              </ActionIcon>
              <Text c={'orange'}>Недовереная сессия</Text>
            </Group>
          </Tooltip>
        </Session.Trusted>
        <Session.Trusted trusted={false}>
          <Button
            onClick={() => {
              actions.onRevokeAll();
            }}
          >
            {t('close_all_sessions')}
          </Button>
        </Session.Trusted>
      </Session.Footer>
    </Session>
  );
};
