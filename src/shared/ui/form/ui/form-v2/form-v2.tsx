import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../../model';
import { Checkbox } from './fields/checkbox';
import { Title } from './form-components/title';
import { Select } from './fields/select';
import { Form } from './form';
import { Layouts } from './form-components/layouts';
import { TextInput } from './fields/text-input';
import { PasswordInput } from './fields/password-input';
import {
  DirtyButton,
  ResetButton,
  SubmitButton,
  UnivButton,
} from './form-components/button';
import { SecondAction } from './form-components/second-action';
import { TextArea } from './fields/text-area';

export const { useAppForm, withFieldGroup } = createFormHook({
  fieldContext: fieldContext,
  formContext: formContext,
  fieldComponents: { TextArea, Checkbox, Select, TextInput, PasswordInput },
  formComponents: {
    UnivButton,
    DirtyButton,
    SubmitButton,
    Title,
    ResetButton,
    Form,
    SecondAction,
    ...Layouts,
  },
});
