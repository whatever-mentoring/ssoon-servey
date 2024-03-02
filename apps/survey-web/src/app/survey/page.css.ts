import { vars } from '@ssoon-servey/shared-ui';
import { style } from '@vanilla-extract/css';

export const cardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const borderTop = style({
  backgroundColor: vars.color.primary500,
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  height: '10px',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});

export const cardWrapper = style({
  padding: '24px',
  paddingTop: '22px',
});
