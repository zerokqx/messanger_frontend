import { Badge, Grid, Text, ThemeIcon } from '@mantine/core';
import { If, Then } from 'react-if';
import type { SideItemProps } from '../types/item.type';
import { useId } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { IconButton } from '../../buttons';

export const SideItem = ({
  children,
  icon,
  onClick,
  ...props
}: SideItemProps) => {
  return (
    <IconButton onClick={onClick} leftSection={<ThemeIcon>{icon}</ThemeIcon>}>
      <Text>{children}</Text>
    </IconButton>

    // <Grid
    //   key={id}
    //   align="center"
    //   {...props}
    //   onClick={onClick}
    //   bdrs={'xl'}
    //   className={hover}
    // >
    //   {!watches && (
    //     <Grid.Col span={'content'}>
    //       <ThemeIcon size={'xl'}>{children}</ThemeIcon>
    //     </Grid.Col>
    //   )}
    //   <Grid.Col span={'auto'}>
    //     <Text>{text}</Text>
    //   </Grid.Col>
    //   <If condition={inDev && !watches}>
    //     <Then>
    //       {(() => {
    //         return (
    //           <Grid.Col pr={'md'} span={'content'}>
    //             <Badge>В разработке</Badge>
    //           </Grid.Col>
    //         );
    //       })()}
    //     </Then>
    //   </If>
    // </Grid>
  );
};
