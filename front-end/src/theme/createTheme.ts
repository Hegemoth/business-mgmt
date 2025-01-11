import { createTheme as createMuiTheme } from '@mui/material';
import { plPL } from '@mui/x-data-grid-pro/locales';
import { createComponents } from './createComponents';
import { createPalette } from './createPalette';
import { createShadows } from './createShadows';
import { createTypography } from './createTypography';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const createTheme = () => {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme(
    {
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1440,
          xxl: 1750,
        },
      },
      components: components,
      palette: palette,
      shadows,
      shape: {
        borderRadius: 8,
      },
      typography: typography,
      zIndex: {
        appBar: 1251,
        modal: 1251,
      },
    },
    plPL
  );
};
