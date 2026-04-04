import { Text, type MantineColor, type TextProps } from '@mantine/core';

interface CharCounterProps extends TextProps {
  max: number;
  currentCount: number;
  invalidColor?: MantineColor;
}
export const CharCounter = ({
  currentCount,
  c,
  max,
  invalidColor,
}: CharCounterProps) => {
  return (
    <Text c={currentCount > max ? invalidColor : c}>
      {currentCount}/{max}
    </Text>
  );
};
