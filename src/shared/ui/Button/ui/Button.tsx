import { Button as ButtonMantine } from "@mantine/core";
import { twMerge } from "tailwind-merge";
import type { CustomButtonProps } from "../types";
export const CustomMantineButton = ({
  children,
  className,

  ...props
}: CustomButtonProps) => {
  const styles = twMerge(className, "");
  return (
    <ButtonMantine {...props} className="">
      {children}
    </ButtonMantine>
  );
};
