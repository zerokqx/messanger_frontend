import type { ComponentProps } from "react";

export interface FieldSet<K extends object = object>
  extends Pick<ComponentProps<"input">, "placeholder"> {
  name: keyof K;
}
