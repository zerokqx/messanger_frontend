import { Flex } from '@mantine/core';
import type { DescriptionProp } from '../types/description.type';
import { DescText } from './DescText';

/**
 * Description component - контейнер для отображения описания с дополнительным содержимым
 *
 * @component
 * @example
 * ```
 * <Description desc="Текст описания">
 *   <Icon />
 *   Дополнительное содержимое
 * </Description>
 * ```
 *
 * @param  props - параметры компонента
 * @param  props.desc - текст описания (обязательный)
 * @param  props.children - дополнительное содержимое компонента
 * @param  props - все пропсы Mantine Flex компонента (gap, direction, align, justify и т.д.)
 *
 */
export const Description = ({ desc, children, ...props }: DescriptionProp) => {
  return (
    <Flex direction={'column'} gap={'xs'} {...props}>
      {children}
      <DescText>{desc}</DescText>
    </Flex>
  );
};
