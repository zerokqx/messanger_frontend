import { useProfilePut } from '@/features/profile-put';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createPermissions,
  type PermissionsStringify,
} from '../lib/create-permissions';
import { normilizePermissions } from '../lib/normilize-permissions';
import type { ProfileData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { Check, Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, Select, Button, Stack } from '@mantine/core';
import { useTails } from '@/shared/lib/tails';
import { RoundedContainerStack } from '@/shared/ui/boxes';
import { notify } from '@/shared/lib/notifications';

type Permissions = ProfileData;

export const ProfilePermissions = memo(
  ({ permissions }: { permissions: Permissions }) => {
    const { t } = useTranslation([
      'permisions',
      'button-labels',
    ]);

    const {
      register,
      control,
      handleSubmit,
      formState: { isDirty },
    } = useForm<PermissionsStringify>({
      defaultValues: createPermissions(permissions.profile_permissions),
    });

    const { mutate, isPending, isSuccess } = useProfilePut();
    const tailIsSuccess = useTails(1000, isSuccess);

    const onSubmit = (data: PermissionsStringify) => {
      mutate(
        {
          data: {
            profile_permissions: normilizePermissions(data),
          },
        },
        {
          onSuccess() {
            notify.success();
          },
        }
      );
    };

    const everyoneContactsNobodyData = [
      { label: t('permisions:everyone'), value: '0' },
      { label: t('permisions:contacts'), value: '1' },
      { label: t('permisions:nobody'), value: '2' },
    ];

    const autoDeleteAfterDaysData = [
      {
        label: t('permisions:auto_delete_after_days_1_month'),
        value: '30',
      },
      {
        label: t('permisions:auto_delete_after_days_3_months'),
        value: '90',
      },
      {
        label: t('permisions:auto_delete_after_days_6_months'),
        value: '180',
      },
      {
        label: t('permisions:auto_delete_after_days_12_months'),
        value: '365',
      },
    ];

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <RoundedContainerStack bdrs={0}>
            <Checkbox
              {...register('is_searchable')}
              label={t('permisions:is_searchable')}
            />
            <Checkbox
              {...register('allow_message_forwarding')}
              label={t('permisions:allow_message_forwarding')}
            />
            <Checkbox
              {...register('allow_messages_from_non_contacts')}
              label={t('permisions:allow_messages_from_non_contacts')}
            />
            <Checkbox
              {...register('show_profile_photo_to_non_contacts')}
              label={t('permisions:show_profile_photo_to_non_contacts')}
            />
            <Checkbox
              {...register('show_bio_to_non_contacts')}
              label={t('permisions:show_bio_to_non_contacts')}
            />
            <Checkbox
              {...register('show_stories_to_non_contacts')}
              label={t('permisions:show_stories_to_non_contacts')}
            />
          </RoundedContainerStack>
          <RoundedContainerStack bdrs={0}>
            <Controller
              name="last_seen_visibility"
              control={control}
              render={({ field }) => (
                <Select
                  variant="filled"
                  {...field}
                  label={t('permisions:last_seen_visibility')}
                  data={everyoneContactsNobodyData}
                />
              )}
            />

            <Controller
              name="call_permission"
              control={control}
              render={({ field }) => (
                <Select
                  variant="filled"
                  {...field}
                  label={t('permisions:call_permission')}
                  data={everyoneContactsNobodyData}
                />
              )}
            />
          </RoundedContainerStack>
          <RoundedContainerStack bdrs={0}>
            <Controller
              name="public_invite_permission"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  variant="filled"
                  label={t('permisions:public_invite_permission')}
                  data={everyoneContactsNobodyData}
                />
              )}
            />

            <Controller
              name="group_invite_permission"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  variant="filled"
                  label={t('permisions:group_invite_permission')}
                  data={everyoneContactsNobodyData}
                />
              )}
            />
          </RoundedContainerStack>

          <RoundedContainerStack bdrs={0}>
            <Controller
              name="auto_delete_after_days"
              control={control}
              render={({ field }) => (
                <Select
                  variant="filled"
                  {...field}
                  label={t('permisions:auto_delete_after_days')}
                  data={autoDeleteAfterDaysData}
                />
              )}
            />
          </RoundedContainerStack>

          <Button
            type="submit"
            loading={isPending}
            disabled={!isDirty}
            leftSection={
              tailIsSuccess ? <Check size={18} /> : <Save size={18} />
            }
            color={tailIsSuccess ? 'green' : undefined}
            variant="subtle"
            mt="lg"
          >
            {t('button-labels:save')}
          </Button>
        </Stack>
      </form>
    );
  }
);
