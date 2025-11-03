import { useProfilePut } from '@/features/profilePut';
import { useAuth } from '@/shared/model/authProviderContext';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import { Stack } from '@mantine/core';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
export const DisplayPermissionSettings = memo(() => {
  const { t } = useTranslation(['ns1', 'ns2', 'ns3']);
  const { mutate } = useProfilePut();
  const permissions = useAuth((s) => s.user.profile_permissions);
  const form = useAppForm({
    defaultValues: permissions,
    onSubmit: ({ value }) => {
      console.log(value);
      mutate({
        body: {
          profile_permissions: value,
        },
      });
    },
  });

  const selectData = useMemo(() => {
    const everyoneContactsNobody = [
      { label: t('ns2:everyone'), value: '0' },
      { label: t('ns2:contacts'), value: '1' },
      { label: t('ns2:nobody'), value: '2' },
    ];

    const hoursValues = [2, 8, 12, 24];
    const hours = hoursValues.map((hour) => ({
      label: t('hours', { count: hour }),
      value: String(hour * 3600),
    }));

    const daysValues = [1, 7, 14, 30, 60, 90, 180, 365];
    const days = daysValues.map((day) => ({
      label: t('days', { count: day }),
      value: String(day),
    }));

    return { everyoneContactsNobody, hours, days };
  }, [t]);

  return (
    <form.AppForm>
      <form.Form>
        <Stack gap="md">
          <form.Title text={t('ns2:title')} />

          {/* Чекбоксы */}
          <form.AppField name="is_searchable">
            {(field) => <field.Checkbox label={t('ns2:is_searchable')} />}
          </form.AppField>

          <form.AppField name="allow_message_forwarding">
            {(field) => (
              <field.Checkbox label={t('ns2:allow_message_forwarding')} />
            )}
          </form.AppField>

          <form.AppField name="allow_messages_from_non_contacts">
            {(field) => (
              <field.Checkbox
                label={t('ns2:allow_messages_from_non_contacts')}
              />
            )}
          </form.AppField>

          <form.AppField name="show_profile_photo_to_non_contacts">
            {(field) => (
              <field.Checkbox
                label={t('ns2:show_profile_photo_to_non_contacts')}
              />
            )}
          </form.AppField>

          <form.AppField name="show_bio_to_non_contacts">
            {(field) => (
              <field.Checkbox label={t('ns2:show_bio_to_non_contacts')} />
            )}
          </form.AppField>

          <form.AppField name="show_stories_to_non_contacts">
            {(field) => (
              <field.Checkbox label={t('ns2:show_stories_to_non_contacts')} />
            )}
          </form.AppField>

          <form.AppField name="allow_server_chats">
            {(field) => <field.Checkbox label={t('ns2:allow_server_chats')} />}
          </form.AppField>

          <form.AppField name="force_auto_delete_messages_in_private">
            {(field) => (
              <field.Checkbox
                label={t('ns2:force_auto_delete_messages_in_private')}
              />
            )}
          </form.AppField>

          {/* Селекты */}
          <form.AppField name="last_seen_visibility">
            {(field) => (
              <field.Select
                label={t('ns2:last_seen_visibility')}
                data={selectData.everyoneContactsNobody}
              />
            )}
          </form.AppField>

          <form.AppField name="public_invite_permission">
            {(field) => (
              <field.Select
                label={t('ns2:public_invite_permission')}
                data={selectData.everyoneContactsNobody}
              />
            )}
          </form.AppField>

          <form.AppField name="group_invite_permission">
            {(field) => (
              <field.Select
                label={t('ns2:group_invite_permission')}
                data={selectData.everyoneContactsNobody}
              />
            )}
          </form.AppField>

          <form.AppField name="call_permission">
            {(field) => (
              <field.Select
                label={t('ns2:call_permission')}
                data={selectData.everyoneContactsNobody}
              />
            )}
          </form.AppField>

          <form.AppField name="max_message_auto_delete_seconds">
            {(field) => (
              <field.Select
                label={t('ns2:max_message_auto_delete_seconds')}
                data={selectData.hours}
              />
            )}
          </form.AppField>

          <form.AppField name="auto_delete_after_days">
            {(field) => (
              <field.Select
                label={t('ns2:auto_delete_after_days')}
                data={selectData.days}
              />
            )}
          </form.AppField>
        </Stack>

        <form.DirtyButton>{t('ns3:save')}</form.DirtyButton>
      </form.Form>
    </form.AppForm>
  );
});
