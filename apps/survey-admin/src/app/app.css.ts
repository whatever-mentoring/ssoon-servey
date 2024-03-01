import { vars } from '@ssoon-servey/shared-ui';
import { style } from '@vanilla-extract/css';

export const container = style({
  margin: 'auto',
  maxWidth: '90vw',
  width: '640px',
  marginTop: '12px',
  marginBottom: '12px',
});
export const wrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  position: 'relative',
});

export const cardWrapper = style({
  padding: '24px',
  paddingTop: '22px',
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

export const toolbar = style({
  position: 'absolute',
  top: '106px',
  right: '-50px',
});

export const surveyTitleInput = style({});
