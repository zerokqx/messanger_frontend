import { useContactUpdate } from '../api/useContactUpdate';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';
import type { UpdateContactFormProps } from '../types/updateForm.type';
import { successNotify } from '@/shared/lib/notifications/success';

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
