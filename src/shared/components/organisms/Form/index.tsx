import { StrictInput } from "@/components/atoms";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import {
  createFormHook,
  createFormHookContexts,
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

/**
 * Fabric function for declarative create form based on `Tanstack-Form`
 * @param fieldSet Attr for map by fields.
 * @param options Options for form
 */
export function createForm<O extends AnyFormOptions>(
  fieldSet: FieldSet<O["defaultValues"]>[],
  options: O,
) {
  return withForm({
    ...options,
    props: {
      title: "Форма",
    },

    render: function Render({ form, title }) {
      const theme = useMantineTheme();
      return (
        <Flex
          w={"full"}
          direction={"column"}
          justify={"center"}
          align={"center"}
          h={"100vh"}
        >
          <Text fw={700}>{title}</Text>
          <Flex direction={"column"} w={"max-content"} gap={"sm"} p="lg">
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
          </Flex>
          <form.AppForm>
            <form.SubscribeButton
              useFormContext={useFormContext}
              label="Отправить"
            />
          </form.AppForm>
        </Flex>
      );
    },
  });
}

export { useAppForm };
