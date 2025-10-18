import { vars } from '@/shared/theme/theme.css';
import { style } from '@vanilla-extract/css';
export const hoverOpacity = style({
  top: 0,
  content: '',
  zIndex: 0,
  left: 0,
  borderRadius: vars.radius.md,
  position: 'absolute',
  width: '100%',
  opacity: '0.05',
  height: '100%',
  ':hover': {
    background: vars.colors.white,
  },
});
