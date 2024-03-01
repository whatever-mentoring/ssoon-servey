import { vars } from '@ssoon-servey/shared-ui';
import { style } from '@vanilla-extract/css';

export const cardWrapper = style({
  padding: '24px',
  paddingTop: '22px',
  paddingBottom: '12px',
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const activeStyle = style({
  position: 'absolute',
  left: 0,
  top: 0,
  borderRadius: '8px 0px 0px 8px',
  width: '6px',
  height: '100%',
  backgroundColor: '#4285f4',
});

export const inputFocusStyle = style({
  width: '100%',
  padding: '4px',
  ':focus': {
    borderBottom: `2px solid ${vars.color.primary500}`,
  },
});

export const questionContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '15px',
  flexWrap: 'wrap',
});
export const questionInputTitle = style([
  inputFocusStyle,
  {
    maxWidth: '60%',
    padding: '16px',
    backgroundColor: vars.color.grayScale50,
    borderBottom: `1px solid ${vars.color.grayScale500}`,
  },
]);

export const selectBoxContainer = style({
  width: '180px',
  height: '50px',
  borderRadius: '4px',
  border: `1px solid ${vars.color.grayScale100}`,
});

export const selectBox = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  padding: '6px',
});

export const optionContainer = style({
  width: '100%',
  paddingTop: '15px',
  paddingBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
});

export const optionWrapper = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

export const optionAddButton = style({
  marginTop: '5px',
});

export const itemFooterContainer = style({
  width: '100%',
  borderTop: `1px solid ${vars.color.grayScale100}`,
  display: 'flex',
  paddingTop: '10px',
  justifyContent: 'flex-end',
});

export const itemFooterWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const bar = style({
  width: '2px',
  height: '20px',
  backgroundColor: vars.color.grayScale100,
});
export const required = style({
  display: 'flex',
  gap: '3px',
  alignItems: 'center',
});
