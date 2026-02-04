import { useAppForm } from '@/shared/ui/form/ui/form-v2/form-v2';
import { successNotify } from '@/shared/lib/notifications/success';
import type { UpdateContactFormProps } from './types/update-contact-form.types';
import { useContactUpdate } from '../api';

export const UpdateContactForm = ({
  initialState,
  uuid,
}: UpdateContactFormProps) => {
  const { mutateAsync } = useContactUpdate();

  const form = useAppForm({
    defaultValues: initialState,
    async onSubmit({ value: { custom_name } }) {
      await mutateAsync(
        {
          body: {
            user_id: uuid,
            custom_name,
          },
        },
        {
          onSuccess: () => {
            successNotify('Имя изменено.');
          },
        }
      );
    },
  });

  return (
    <form.AppForm>
      <form.Form>
        <form.Vertical>
          <form.AppField
            name="custom_name"
            children={(field) => <field.TextInput />}
          />
          <form.DirtyButton type="submit">Сохранить</form.DirtyButton>
        </form.Vertical>
      </form.Form>
    </form.AppForm>
  );
};
