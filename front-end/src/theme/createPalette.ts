import { common } from '@mui/material/colors';
import { alpha, PaletteOptions } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral: Record<number, string>;
  }
}

export const createPalette = (): PaletteOptions => {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: common.white,
      paper: common.white,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary: indigo,
    success,
    text: {
      primary: '#1A1A1A',
      secondary: '#3C3C3C',
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
};
