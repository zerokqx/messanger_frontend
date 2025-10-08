import {
  ActionIcon,
  useMantineColorScheme,
  type MantineColorScheme,
} from "@mantine/core";
import type { MouseEventHandler } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import type { IconType } from "react-icons/lib";
import { MdAutoAwesome } from "react-icons/md";
export const ThemeToggle = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const Icons: Record<MantineColorScheme, IconType> = {
    dark: FaMoon,
    light: IoIosSunny,
    auto: MdAutoAwesome,
  };
  const IconComponent = Icons[colorScheme];
  const setColorSchemeEvent: MouseEventHandler<HTMLButtonElement> = (e) =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ActionIcon onClick={setColorSchemeEvent}>
      <IconComponent />
    </ActionIcon>
  );
};
