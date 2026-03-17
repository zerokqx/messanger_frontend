import { useProfilePut } from '@/features/profile-put';
import { usePlurarDates } from '@/shared/lib/hooks/use-date';
import { useQueryClient } from '@tanstack/react-query';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createPermissions,
  type PermissionsStringify,
} from '../lib/create-permissions';
import { normilizePermissions } from '../lib/normilize-permissions';
import type { components } from '@/shared/types/v1';
import { Check, Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, Select, Button, Stack } from '@mantine/core';
import { useTails } from '@/shared/lib/tails';
import { RoundedContainerStack } from '@/shared/ui/boxes';

type Permissions = components['schemas']['ProfileData'];

export const ProfilePermissions = memo(
  ({ permissions }: { permissions: Permissions }) => {
    const { t } = useTranslation([
      'permisions',
      'plurar-data',
      'button-labels',
    ]);
    const hoursPlurar = usePlurarDates((s) => s.hours);
    const daysPlurar = usePlurarDates((s) => s.days);
    const queryClient = useQueryClient();

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
          body: {
            profile_permissions: normilizePermissions(data),
          },
        },
        {
          async onSuccess() {
            await queryClient.invalidateQueries({
              queryKey: ['get', '/me', {}],
            });
          },
        }
      );
    };

    const selectData = useMemo(() => {
      const everyoneContactsNobody = [
        { label: t('permisions:everyone'), value: '0' },
        { label: t('permisions:contacts'), value: '1' },
        { label: t('permisions:nobody'), value: '2' },
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
            <Checkbox
              {...register('allow_server_chats')}
              label={t('permisions:allow_server_chats')}
            />
            <Checkbox
              {...register('force_auto_delete_messages_in_private')}
              label={t('permisions:force_auto_delete_messages_in_private')}
            />
          </RoundedContainerStack>
          <RoundedContainerStack bdrs={0}>

          <Controller
            name="last_seen_visibility"
            control={control}
            render={({ field }) => (

              <Select
                  variant='filled'
                {...field}
                label={t('permisions:last_seen_visibility')}
                data={selectData.everyoneContactsNobody}
              />
            )}
          />

          <Controller
            name="call_permission"
            control={control}
            render={({ field }) => (
              <Select

                  variant='filled'
                {...field}
                label={t('permisions:call_permission')}
                data={selectData.everyoneContactsNobody}
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
                  data={selectData.everyoneContactsNobody}
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
                  data={selectData.everyoneContactsNobody}
                />
              )}
            />
          </RoundedContainerStack>


          <RoundedContainerStack bdrs={0}>
            <Controller
              name="max_message_auto_delete_seconds"
              control={control}
              render={({ field }) => (
                <Select
                  variant='filled'
                  {...field}
                  label={t('permisions:max_message_auto_delete_seconds')}
                  data={[
                    {
                      value: 'null',
                      label: t('permisions:do_not_delete'),
                    },
                    ...selectData.hours,
                  ]}
                />
              )}
            />

            <Controller
              name="auto_delete_after_days"
              control={control}
              render={({ field }) => (
                <Select

                  variant='filled'
                  {...field}
                  label={t('permisions:auto_delete_after_days')}
                  data={[
                    {
                      value: 'null',
                      label: t('permisions:do_not_delete'),
                    },
                    ...selectData.days,
                  ]}
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
