import { StrictInput } from "@/components/atoms";
import { loginFormSchema } from "@/zod";
import { Center, Text, useMantineTheme } from "@mantine/core";
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
  type AnyFormOptions,
} from "@tanstack/react-form";
import { SubscribeButton } from "./SubscribeButton";
import type { FieldSet } from "./types";

export const {
  useFormContext,
  fieldContext: fieldContextLogin,
  formContext: formContextLogin,
  useFieldContext,
} = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    StrictInput,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext: fieldContextLogin,
  formContext: formContextLogin,
});

export function createForm<O extends AnyFormOptions>(
  fieldSet: FieldSet<O["defaultValues"]>[],
  options: AnyFormApi,
) {
  return withForm({
    ...options,
    props: {
      title: "Форма",
    },

    render: function Render({ form, title }) {
      const theme = useMantineTheme();
      return (
        <Center
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
            gap: theme.spacing.xs,
          }}
        >
          <Text fw={700}>{title}</Text>
          {fieldSet.map((fieldData) => (
            <form.AppField
              name={fieldData.name.toString()}
              children={(field) => (
                <field.StrictInput
                  placeholder={fieldData.placeholder}
                  contextHook={fieldData.contextHook}
                />
              )}
            />
          ))}
          <form.AppForm>
            <form.SubscribeButton
              useFormContext={useFormContext}
              label="Submit"
            />
          </form.AppForm>
        </Center>
      );
    },
  });
}

export { useAppForm };
