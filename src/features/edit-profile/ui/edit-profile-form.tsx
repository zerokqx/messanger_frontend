import { useMe } from '@/entities/user/model/me.query';
import { useTranslation } from 'react-i18next';
import { useEditProfile } from '../api';
import { useOs } from '@/shared/lib/use-os';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  Stack,
  Textarea,
  Text,
  TextInput,
  Center,
  Avatar,
  FileButton,
} from '@mantine/core';
import { useTails } from '@/shared/lib/tails';
import { TailButton } from '@/shared/ui/buttons';
import { Check, Save } from 'lucide-react';
import { useMount, useUnmount } from 'react-use';
import { urlAvatar, useUploadAvatar } from '@/entities/user';
import { getGetMyProfileMeGetQueryKey } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';

interface ProfileEditFormProps {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}

interface ProfileFormState {
  bio: string;
  full_name?: string | null;
  avatar?: File;
}

export const ProfileEditForm = ({
  onSuccess,
  onError,
}: ProfileEditFormProps) => {
  const { t } = useTranslation(['field-labels', 'button-labels']);
  const osType = useOs();
  const { data } = useMe();
  const { mutate, reset, isPending, isSuccess } = useEditProfile();
  const { mutateAsync: uploadAvatar } = useUploadAvatar();
  const tailIsSuccess = useTails(1000, isSuccess);
  useMount(reset);
  useUnmount(reset);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ProfileFormState>({
    defaultValues: {
      full_name: data.full_name,
      bio: data.bio ?? '',
    },
  });
  const avatar = watch('avatar');
  const onSubmit: SubmitHandler<ProfileFormState> = async (values) => {
    if (values.avatar) {
      await uploadAvatar(
        { data: { file: values.avatar } },
        {
          onSuccess(_data, _variables, _onMutateResult, context) {
            void context.client.invalidateQueries({
              queryKey: getGetMyProfileMeGetQueryKey(),
            });
          },
        }
      );
    }
    mutate(
      {
        data: values,
      },
      {
        onError,
        onSuccess() {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center>
        <FileButton
          accept="image/png,image/jpeg,image/webp"
          onChange={(payload) => {
            if (payload) {
              setValue('avatar', payload, {
                shouldDirty: true,
              });
            }
          }}
        >
          {(props) => (
            <Avatar
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : urlAvatar(data.user_id, data.avatars?.current?.file_id)
              }
              name={data.login}
              size={'xl'}
              {...props}
            />
          )}
        </FileButton>
      </Center>
      <Stack gap="md">
        <TextInput
          {...register('full_name')}
          label={t('field-labels:full-name')}
          placeholder="Alexandr ..."
        />
        <Textarea
          {...register('bio')}
          label={t('field-labels:bio_label')}
          rows={4}
          placeholder="..."
          onKeyDown={(e) => {
            if (!osType.isDesktop) return;
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void handleSubmit(onSubmit)();
            }
          }}
          description={
            osType.isDesktop && (
              <Text component="span" size="xs" c="dimmed">
                Enter — Отправить <br />
                Shift + Enter — Перенос строки
              </Text>
            )
          }
        />

        <TailButton
          type="submit"
          tailVariant={{
            true: 'light',
            false: 'subtle',
          }}
          tail={tailIsSuccess}
          tailColors={{
            true: 'green',
          }}
          tailSection={{
            true: isDirty && <Check />,
            false: isDirty && <Save />,
          }}
          loading={isPending || isSubmitting}
          disabled={!isDirty || isSubmitting}
          fullWidth={!osType.isDesktop}
        >
          {t('button-labels:save')}
        </TailButton>
      </Stack>
    </form>
  );
};
