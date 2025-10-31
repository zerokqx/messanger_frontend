import type { GridProps, ThemeIconProps } from "@mantine/core";
import type { ReactNode } from "react";

export interface WithIconProp extends GridProps {
  themeIconProps?: ThemeIconProps;
  children: ReactNode;
  icon: ReactNode;
}
