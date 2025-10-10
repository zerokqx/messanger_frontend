import { Input, TextInput, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import type { CustomMantineInputProps } from "..";

export const CustomMantineInput = ({
  styles,
  ...props
}: CustomMantineInputProps) => {
  const [er, setEr] = useState<{
    short: string;
    full: string;
  } | null>(null);
  const theme = useMantineTheme();
  return (
    <Input.Wrapper w="max-content" error={er ? er.full : ""}>
      <TextInput
        {...props}
        w={"20rem"}
        h="2rem"
        c={"white"}
        bd={`1px ${theme.white} solid `}
        styles={{
          input: {
            backgroundColor: theme.black,
          },
        }}
      />
    </Input.Wrapper>
  );
};
