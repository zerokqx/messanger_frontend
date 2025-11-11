import { Button, useProps, Loader } from '@mantine/core';
import { useFormContext } from '../../../model';
import type {
  FormButtonProp,
  FormButtonWithoutSelectorProp,
} from '../../../types/formButtonProp.type';
import { useStore } from '@tanstack/react-form';
export const UnivButton = (props: FormButtonProp) => {
  const defaultProps: FormButtonProp = {
    selector: () => [true],
  };
  const { selector } = useProps('ResetButton', defaultProps, props);
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={selector}
      children={([rule]) => rule && <Button {...props} />}
    />
  );
};
export const DirtyButton = ({ ...props }: FormButtonWithoutSelectorProp) => {
  return <UnivButton selector={(s) => [s.isDirty]} {...props} />;
};
export const SubmitButton = ({
  children,
  ...props
}: FormButtonWithoutSelectorProp) => {
  const form = useFormContext();
  const [isSubmitting] = useStore(form.store, (s) => [s.isSubmitting]);
  return (
    <UnivButton type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting ? <Loader size={16} /> : children}
    </UnivButton>
  );
};
export const ResetButton = (props: Omit<FormButtonProp, 'onClick'>) => {
  const form = useFormContext();
  return (
    <UnivButton
      onClick={() => {
        form.reset();
      }}
      {...props}
    />
  );
};
