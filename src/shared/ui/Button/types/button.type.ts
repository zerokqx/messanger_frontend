import type { ButtonProps } from "@mantine/core";
import type { ComponentProps } from "react";

export interface CustomButtonProps
  extends ButtonProps,
    Omit<ComponentProps<"button">, "color" | "style"> {}
