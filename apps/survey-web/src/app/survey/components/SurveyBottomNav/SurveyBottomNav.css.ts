import { vars } from '@ssoon-servey/shared-ui';
import { style } from '@vanilla-extract/css';

export const surveyNavContainer = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});

export const nextButton = style({
  marginRight: '14px',
  boxShadow:
    '0 2px 1px -1px rgba(0, 0, 0, 0.2),0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122)',
  backgroundColor: vars.color.grayScale00,
  fontSize: '14px',
  borderRadius: '4px',
  lineHeight: '36px',
  padding: '0 24px',
  color: vars.color.primary500,
  ':hover': {
    backgroundColor: '#f9f7fc',
  },
});

export const backButton = style([nextButton]);

export const submitButton = style({
  fontSize: '14px',
  borderRadius: '4px',
  backgroundColor: vars.color.primary500,
  color: vars.color.grayScale00,
  lineHeight: '36px',
  padding: '0 24px',
  ':hover': {
    backgroundColor: '#7654b4',
    boxShadow:
      '0px 2px 1px -1px rgba(103, 58, 183, 0.2),0px 1px 1px 0px rgba(103, 58, 183, 0.14),0px 1px 3px 0px rgba(103, 58, 183, 0.12)',
  },
});

export const resetButton = style({
  padding: '0px 8px',
  fontSize: '14px',
  borderRadius: '4px',
  lineHeight: '36px',
  color: vars.color.primary500,
  ':hover': {
    backgroundColor: vars.color.primary200,
  },
});
