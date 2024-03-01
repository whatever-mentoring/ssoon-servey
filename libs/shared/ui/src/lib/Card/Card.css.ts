import { style } from '@vanilla-extract/css';
import { vars } from '../../global.css';

export const container = style({
  margin: 'auto',
  maxWidth: '90vw',
  width: '640px',
});

export const card = style({
  backgroundColor: vars.color.grayScale00,
  border: `1px solid ${vars.color.grayScale100}`,
  borderRadius: '8px',
  position: 'relative',
});
