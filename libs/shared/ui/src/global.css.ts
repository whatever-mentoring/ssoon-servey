import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    primary100: '#f0ebf8',
    primary200: '#e9e7f7',
    primary500: '#673ab7',
    grayScale00: '#fff',
    grayScale100: '#dadce0',
    grayScale500: '#adb1ba',
    grayScale900: '#202124',
    red500: '#d93025',
  },
  font: {
    body: 'Roboto, RobotoDraft, Helvetica, Arial, sans-serif',
  },
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('*', {
  margin: 0,
  padding: 0,
  font: 'inherit',
});

globalStyle('button', {
  cursor: 'pointer',
  borderRadius: 0,
  border: 'none',
  backgroundColor: 'transparent',
});

globalStyle('html, body', {
  margin: 0,
  fontFamily: vars.font.body,
  color: vars.color.grayScale900,
  accentColor: vars.color.primary500,
});

globalStyle('body', {
  backgroundColor: vars.color.primary100,
});
