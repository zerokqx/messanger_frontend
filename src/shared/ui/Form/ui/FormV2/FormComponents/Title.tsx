import { Title as TitleM, type TitleProps } from '@mantine/core';
export const Title = ({ text, ...props }: { text: string } & TitleProps) => {
  return (
    <TitleM size={'xl'} c={'blue'} {...props}>
      {text}
    </TitleM>
  );
};
