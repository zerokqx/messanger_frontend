import { useMe } from '@/entities/user/model/me.query';
import { useTranslation } from 'react-i18next';
import { useEditProfile } from '../api';
import { useOs } from '@/shared/lib/use-os';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Stack, Textarea, Text } from '@mantine/core';
import { useTails } from '@/shared/lib/tails';
import { TailButton } from '@/shared/ui/buttons';
import { Check, Save } from 'lucide-react';

interface ProfileEditFormProps {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}

interface ProfileFormState {
  bio: string;
}

export const ProfileEditForm = ({
  onSuccess,
  onError,
}: ProfileEditFormProps) => {
  const { t } = useTranslation(['field-labels', 'button-labels']);
  const osType = useOs();
  const { data } = useMe();
  const { mutate, isPending, isSuccess } = useEditProfile();
  const tailIsSuccess = useTails(1000,isSuccess)

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ProfileFormState>({
    defaultValues: {
      bio: data.bio ?? '',
    },
  });

  const onSubmit: SubmitHandler<ProfileFormState> = (values) => {
    mutate(
      {
        body: {
          bio: values.bio,
        },
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
      <Stack gap="md">
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
              <Text size="xs" c="dimmed">
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
