import type { createFormHookContexts } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import type { z, ZodObject } from "zod";

export interface FieldSet<K extends object = object>
  extends Pick<ComponentProps<"input">, "placeholder"> {
  name: keyof K;
  contextHook: ReturnType<typeof createFormHookContexts>["useFieldContext"];
}
