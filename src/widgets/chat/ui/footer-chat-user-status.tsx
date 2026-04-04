import { useRemoveFromBlacklist } from '@/entities/user';
import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { border } from '@/shared/lib/css-utils';
import { lightDark } from '@/shared/lib/light-dark';
import { comboRelations } from '@/shared/lib/realtionship-helpers';
import { Button, Group, Text, ThemeIcon } from '@mantine/core';
import { Lock, LockKeyhole } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface FooterChatUserBlockedProps {
  children?: ReactNode;
  targetUser: Pick<
    ProfileByUserIdData,
    'login' | 'relationship' | 'user_id' | 'permissions'
  >;
}
export const FooterChatUserBlocked = ({
  children,
  targetUser: { relationship, login, user_id, permissions },
}: FooterChatUserBlockedProps) => {
  const { mutateAsync: unblock } = useRemoveFromBlacklist();
  const [t] = useTranslation('chat');
  const relations = useMemo(() => comboRelations(relationship), [relationship]);

  return relations.oneOfTheBlocked || !permissions.you_can_send_message ? (
    <Group
      p={'md'}
      styles={{
        root: {
          borderTop: border('1px', 'solid', lightDark('gray.3', 'dark.4')),
        },
      }}
      justify="center"
    >
      {(() => {
        if (relationship.is_target_user_blocked_by_current_user) {
          return (
            <Button
              color="red"
              onClick={async () => {
                await unblock({
                  data: {
                    user_id,
                  },
                });
              }}
              variant="light"
            >
              {t('unblock')}
            </Button>
          );
        }

        if (relationship.is_current_user_in_blacklist_of_target) {
          return <Text>{t('blocked-you', { login: login ?? '' })}</Text>;
        }

        if (!permissions.you_can_send_message)
          return (
            <Group>
              <ThemeIcon c="dimmed">
                <Lock />
              </ThemeIcon>
              <Text c={'dimmed'}>
                {t('you-cant-write-this-chat', { login: login ?? '' })}
              </Text>
            </Group>
          );

        return null;
      })()}
    </Group>
  ) : (
    children
  );
};
