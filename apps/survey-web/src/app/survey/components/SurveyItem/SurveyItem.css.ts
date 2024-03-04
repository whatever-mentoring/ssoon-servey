import { vars } from '@ssoon-servey/shared-ui';
import { style } from '@vanilla-extract/css';

export const cardWrapper = style({
  padding: '24px',
  paddingTop: '22px',
});

// SurveyItem
export const itemTitle = style({
  display: 'flex',
  gap: '0.25em',
});

export const asterisk = style({
  color: vars.color.red500,
});

//radioOptions
export const optionContainer = style({
  width: '100%',
  minHeight: '24px',
  padding: '0.5em 0.5em 0.5em 0',
});
export const optionWrapper = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75em',
});

// selectOptions
export const selectBox = style({
  position: 'relative',
  width: '150px',
  height: '45px',
  borderRadius: '4px',
  border: `1px solid ${vars.color.grayScale100}`,
});

export const select = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  padding: '6px',
});

// TextAreaOptions
export const textArea = style({
  border: 0,
  resize: 'none',
  width: '100%',
  borderBottom: `1px solid ${vars.color.grayScale100}`,
  padding: '3px',
  ':focus': {
    outline: 'none',
    borderBottom: `1px solid ${vars.color.primary500}`,
  },
});
