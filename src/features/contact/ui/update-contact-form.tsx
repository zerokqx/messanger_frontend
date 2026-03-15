import { useContactUpdate } from '../api';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Stack, TextInput } from '@mantine/core';
import { notify } from '@/shared/lib/notifications';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateContactSchema } from '../model/update-contact-validation';

interface UpdateContactFormState {
  customName?: string;
}

interface UpdateContactFormProps {
  uuid: string;
  initialState: UpdateContactFormState;
  onSuccessUpdate?: () => void;
}
export const UpdateContactForm = ({
  initialState,
  uuid,
  onSuccessUpdate,
}: UpdateContactFormProps) => {
  const { mutateAsync } = useContactUpdate();
  const [t] = useTranslation(['button-labels', 'update-contact']);

  const { register, handleSubmit, formState, getValues, reset } =
    useForm<UpdateContactFormState>({
      defaultValues: initialState,
      resolver: zodResolver(UpdateContactSchema),
    });

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
          (onSuccessUpdate ?? notify.success)();
          reset(getValues(), { keepValues: true });
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <TextInput
          error={formState.errors.customName?.message}
          label={t('update-contact:custom-name')}
          placeholder="..."
          {...register('customName')}
        />
        <Button
          type="submit"
          loading={formState.isSubmitting}
          disabled={!formState.isDirty}
          variant="light"
        >
          {t('save')}
        </Button>
      </Stack>
    </form>
  );
};
