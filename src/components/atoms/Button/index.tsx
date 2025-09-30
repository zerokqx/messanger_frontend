import { Button as ButtonMantine, type ButtonProps } from "@mantine/core";
import type { ComponentProps, HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
export const Button = ({
  children,
  className,

  ...props
}: ButtonProps & ComponentProps<"button">) => {
  const styles = twMerge(className, "");
  return (
    <ButtonMantine {...props} className="">
      {children}
    </ButtonMantine>
  );
};
