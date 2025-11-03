import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../../model';
import { Checkbox } from './Checkbox';
import { DirtyButton } from './DirtyButton';
import { Title } from './Title';
import { Select } from './Select';
import { Form } from './Form';

export const { useAppForm } = createFormHook({
  fieldContext: fieldContext,
  formContext: formContext,
  fieldComponents: { Checkbox, Select },
  formComponents: { DirtyButton, Title, Form },
});
