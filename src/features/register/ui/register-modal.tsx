import { registerSchema, useRegister } from '@/features/register';
import type { Fn } from '@/shared/types/utils/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
  type ModalProps,
} from '@mantine/core';
import { TimerReset } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RegisterFormState {
  userName: string;
  password: string;
  confirmPassword: string;
}
interface RegisterModalProps extends ModalProps {
  onSuccessRegister?: Fn;
}
export const RegisterModal = ({
  children,
  onSuccessRegister,
  ...props
}: RegisterModalProps) => {
  const { t } = useTranslation(['button-labels', 'field-labels', 'auth']);
  const { mutateAsync } = useRegister();
  const { register, formState, handleSubmit } = useForm<RegisterFormState>({
    resolver: zodResolver(registerSchema),
  });
  const submit: SubmitHandler<RegisterFormState> = async (
    { password, userName },
    e
  ) => {
    e?.preventDefault();
    await mutateAsync(
      {
        data: {
          password,
          login: userName,
          invite: '2025',
        },
      },
      { onSuccess: onSuccessRegister }
    );
  };

  return (
    <Modal {...props}>
      <form
        onSubmit={(e) => {
          void handleSubmit(submit)(e);
        }}
      >
        <Stack>
          <TextInput
            label={t('field-labels:userName_label')}
            {...register('userName')}
            error={formState.errors.userName?.message}
          />
          <PasswordInput
            label={t('field-labels:password_label')}
            {...register('password')}
            error={formState.errors.password?.message}
          />
          <PasswordInput
            label={t('field-labels:password_repeat_label')}
            {...register('confirmPassword')}
            error={formState.errors.confirmPassword?.message}
          />
          <Group grow>
            <Button
              loading={formState.isSubmitting}
              type="submit"
              variant="light"
            >
              {t('button-labels:register')}
            </Button>

            <Button type="submit" color="gray" variant="subtle">
              {<TimerReset />}
            </Button>
          </Group>
        </Stack>
      </form>
      {children}
    </Modal>
  );
};
