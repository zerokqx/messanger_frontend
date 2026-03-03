import { useContactUpdate } from '../api';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Stack, TextInput } from '@mantine/core';
import { notify } from '@/shared/lib/notifications';
import { useTranslation } from 'react-i18next';

interface UpdateContactFormState {
  customName?: string;
}

export interface UpdateContactFormProps {
  uuid: string;
  initialState: UpdateContactFormState;
}
export const UpdateContactForm = ({
  initialState,
  uuid,
}: UpdateContactFormProps) => {
  const { mutateAsync } = useContactUpdate();
  const [t] = useTranslation(['button-labels', 'update-contact']);

  const { register, handleSubmit, formState } = useForm<UpdateContactFormState>(
    {
      defaultValues: initialState,
    }
  );

  const submit: SubmitHandler<UpdateContactFormState> = async ({
    customName,
  }) => {
    await mutateAsync(
      {
        body: {
          custom_name: customName,
          user_id: uuid,
        },
      },
      {
        onSuccess: () => {
          notify.success();
        },
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
    >
      <Stack>
        <TextInput label={t('custom-name')} {...register('customName')} />
        <Button
          type="submit"
          loading={formState.isSubmitting}
          disabled={!formState.isDirty}
          w={'20rem'}
          variant="light"
        >
          {t('save')}
        </Button>
      </Stack>
    </form>
  );
};
