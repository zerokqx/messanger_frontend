import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../../model';
import { Checkbox } from './Fields/Checkbox';
import { Title } from './FormComponents/Title';
import { Select } from './Fields/Select';
import { Form } from './Form';
import { Layouts } from './FormComponents/Layouts';
import { TextInput } from './Fields/TextInput';
import { PasswordInput } from './Fields/PasswordInput';
import {
  DirtyButton,
  ResetButton,
  SubmitButton,
  UnivButton,
} from './FormComponents/Button';
import { SecondAction } from './FormComponents/SecondAction';
import { TextArea } from './Fields/TextArea';

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
