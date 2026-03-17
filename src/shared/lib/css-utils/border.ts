

export type BorderStyle =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

export const border= (
  size: string,
  style: BorderStyle,
  color: string
): string => {
  return `${size} ${style} ${color}`;
};
