import { style } from '@vanilla-extract/css';

export const hover = style({
  ':hover': {
    background: 'rgba(255,255,255,0.4)',
  },

  ':active': {
    background: 'rgba(255,255,255,0.4)',
  },
});
