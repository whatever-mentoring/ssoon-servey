import { vars } from '@ssoon-servey/shared-ui';
import { style } from '@vanilla-extract/css';

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

export const surveyTitle = style({
  fontSize: '24pt',
  fontWeight: 400,
  paddingBottom: '12px',
});

export const cardWrapper = style({
  padding: '24px',
  paddingTop: '22px',
});

export const emphasize = style({
  fontSize: '14px',
  fontWeight: 400,
  color: vars.color.red500,
  marginBottom: '8px',
});
