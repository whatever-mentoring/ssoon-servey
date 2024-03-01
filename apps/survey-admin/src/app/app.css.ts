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

export const sectionsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '70px',
});
export const sectionWrapper = style({
  position: 'relative',
});
export const sectionLabel = style({
  position: 'absolute',
  top: '-30px',
  left: 0,
  padding: '5px 10px',
  backgroundColor: vars.color.primary500,
  fontSize: '14px',
  lineHeight: '20px',
  color: 'white',
  borderRadius: '8px 8px 0px 0px',
});
export const itemsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '15px',
});

export const inputFocusStyle = style({
  width: '100%',
  padding: '4px',
  ':focus': {
    borderBottom: `2px solid ${vars.color.primary500}`,
  },
});

export const surveyTitle = style([
  inputFocusStyle,
  {
    fontSize: '24pt',
  },
]);
export const surveySubTitle = style([inputFocusStyle]);

export const toolbar = style({
  position: 'absolute',
  top: '0px',
  right: '-50px',
  transition: 'top .2s ease-in-out',
});

export const surveyTitleInput = style({});
