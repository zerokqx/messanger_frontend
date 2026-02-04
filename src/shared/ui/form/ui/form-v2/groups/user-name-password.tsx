import { withFieldGroup } from '../form-v2';
import { t } from 'i18next';
import { getErrorMessage } from '../lib/get-error-message';

export const FieldGroutpUserNamePassword = withFieldGroup({
  defaultValues: {
    userName: '',
    password: '',
  },
  render({ group }) {
    return (
      <>
        <group.AppField
          name="userName"
          children={(field) => (
            <field.TextInput
              error={getErrorMessage(field.state.meta.errors[0])}
              label={t('fieldLabels:userName_label')}
              placeholder="john_doe"
            />
          )}
        />

        <group.AppField
          name="password"
          children={(field) => (
            <field.PasswordInput
              error={getErrorMessage(field.state.meta.errors[0])}
              label={t('fieldLabels:password_label')}
              placeholder="Secure!Pass1"
            />
          )}
        />
      </>
    );
  },
});
