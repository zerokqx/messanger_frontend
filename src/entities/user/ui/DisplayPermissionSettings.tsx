import { catchAndChange } from '../lib/permissionsModificate';
// WARN features use
import { useProfilePut } from '@/features/profilePut';
import { usePlurarDates } from '@/shared/lib/hooks/useDate';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import { useLoaderStore } from '@/shared/ui/SideBar';
import { useQueryClient } from '@tanstack/react-query';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../model';
import { useLoaderData } from '@tanstack/react-router';
import type { components } from '@/shared/types/v1';
import { createPermissions } from '../lib/createPermissions';
import Logger from '@/shared/lib/logger/logger';
import { normilizePermissions } from '../lib/normilizePermissions';
export const DisplayPermissionSettings = memo(() => {
  const { t } = useTranslation([
    'settingsLabels',
    'plurarData',
    'buttonLabels',
  ]);

  const hoursPlurar = usePlurarDates((s) => s.hours);
  const daysPlurar = usePlurarDates((s) => s.days);
  const queryClient = useQueryClient();
  const { mutate } = useProfilePut();
  const permissions = useLoaderData({
    from: '/_authorized/y',
    select: (s) => s.user,
  });
  Logger.debug(
    'DisplayPermissionSettings',
    'permission',
    permissions.profile_permissions
  );
  const setLoad = useLoaderStore.useSetLoading();
  const removeLoader = useLoaderStore.useRemoveLoading();
  const form = useAppForm({
    defaultValues: createPermissions(permissions.profile_permissions),
    onSubmit: ({ value }) => {
      setLoad();
      mutate(
        {
          body: {
            profile_permissions: normilizePermissions(value),
          },
        },
        {
          async onSuccess() {
            await queryClient.invalidateQueries({
              queryKey: ['get', '/me', {}],
            });
          },
          onSettled() {
            removeLoader();
          },
        }
      );
    },
  });
  const selectData = useMemo(() => {
    const everyoneContactsNobody = [
      { label: t('settingsLabels:everyone'), value: '0' },
      { label: t('settingsLabels:contacts'), value: '1' },
      { label: t('settingsLabels:nobody'), value: '2' },
    ];

    const hours = hoursPlurar.map(([oriignal, hour]) => ({
      label: hour,
      value: String(oriignal * 3600),
    }));

    const days = daysPlurar.map(([original, day]) => ({
      label: day,
      value: original.toString(),
    }));

    return { everyoneContactsNobody, hours, days };
  }, [t, hoursPlurar, daysPlurar]);

  return (
    <>
      <form.AppForm>
        <form.Form>
          <form.Vertical>
            <form.Title text={t('settingsLabels:title')} />

            <form.AppField name="is_searchable">
              {(field) => (
                <field.Checkbox label={t('settingsLabels:is_searchable')} />
              )}
            </form.AppField>

            <form.AppField name="allow_message_forwarding">
              {(field) => (
                <field.Checkbox
                  label={t('settingsLabels:allow_message_forwarding')}
                />
              )}
            </form.AppField>

            <form.AppField name="allow_messages_from_non_contacts">
              {(field) => (
                <field.Checkbox
                  label={t('settingsLabels:allow_messages_from_non_contacts')}
                />
              )}
            </form.AppField>

            <form.AppField name="show_profile_photo_to_non_contacts">
              {(field) => (
                <field.Checkbox
                  label={t('settingsLabels:show_profile_photo_to_non_contacts')}
                />
              )}
            </form.AppField>

            <form.AppField name="show_bio_to_non_contacts">
              {(field) => (
                <field.Checkbox
                  label={t('settingsLabels:show_bio_to_non_contacts')}
                />
              )}
            </form.AppField>

            <form.AppField name="show_stories_to_non_contacts">
              {(field) => (
                <field.Checkbox
                  label={t('settingsLabels:show_stories_to_non_contacts')}
                />
              )}
            </form.AppField>

            <form.AppField name="allow_server_chats">
              {(field) => (
                <field.Checkbox
                  label={t('settingsLabels:allow_server_chats')}
                />
              )}
            </form.AppField>

            <form.AppField name="force_auto_delete_messages_in_private">
              {(field) => (
                <field.Checkbox
                  label={t(
                    'settingsLabels:force_auto_delete_messages_in_private'
                  )}
                />
              )}
            </form.AppField>

            {/* Селекты */}
            <form.AppField name="last_seen_visibility">
              {(field) => (
                <field.Select
                  label={t('settingsLabels:last_seen_visibility')}
                  data={selectData.everyoneContactsNobody}
                />
              )}
            </form.AppField>

            <form.AppField name="public_invite_permission">
              {(field) => (
                <field.Select
                  label={t('settingsLabels:public_invite_permission')}
                  data={selectData.everyoneContactsNobody}
                />
              )}
            </form.AppField>

            <form.AppField name="group_invite_permission">
              {(field) => (
                <field.Select
                  label={t('settingsLabels:group_invite_permission')}
                  data={selectData.everyoneContactsNobody}
                />
              )}
            </form.AppField>

            <form.AppField name="call_permission">
              {(field) => (
                <field.Select
                  label={t('settingsLabels:call_permission')}
                  data={selectData.everyoneContactsNobody}
                />
              )}
            </form.AppField>

            <form.AppField name="max_message_auto_delete_seconds">
              {(field) => (
                <field.Select
                  label={t('settingsLabels:max_message_auto_delete_seconds')}
                  data={[
                    { value: 'null', label: 'Не удалять' },
                    ...selectData.hours,
                  ]}
                />
              )}
            </form.AppField>

            <form.AppField name="auto_delete_after_days">
              {(field) => (
                <field.Select
                  label={t('settingsLabels:auto_delete_after_days')}
                  data={[
                    { value: 'null', label: 'Не удалять' },
                    ...selectData.days,
                  ]}
                />
              )}
            </form.AppField>
            <form.DirtyButton type="submit">
              {t('buttonLabels:save')}
            </form.DirtyButton>
          </form.Vertical>
        </form.Form>
      </form.AppForm>
    </>
  );
});
