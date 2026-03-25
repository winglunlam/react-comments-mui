import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    reactCommentsMui?: {
      containerBackgroundColor?: string;
      containerMaxWidth?: string | number;
      avatarSize?: number;
      cardBorderRadius?: number;
    };
  }
  interface ThemeOptions {
    reactCommentsMui?: {
      containerBackgroundColor?: string;
      containerMaxWidth?: string | number;
      avatarSize?: number;
      cardBorderRadius?: number;
    };
  }
}

export const createCommentTheme = (options: ThemeOptions = {}) => {
  return createTheme({
    ...options,
    reactCommentsMui: {
      containerBackgroundColor: '#f9f9f9',
      containerMaxWidth: '800px',
      avatarSize: 32,
      cardBorderRadius: 8,
      ...options.reactCommentsMui,
    },
  });
};

export const defaultCommentTheme = createCommentTheme();
