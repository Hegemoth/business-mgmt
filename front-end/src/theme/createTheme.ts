// @ts-nocheck
import { createTheme as createMuiTheme } from '@mui/material';
// import { plPL } from '@mui/x-data-grid';
import { createComponents } from './createComponents';
import { createPalette } from './createPalette';
import { createShadows } from './createShadows';
import { createTypography } from './createTypography';

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
        },
      },
      components,
      palette,
      shadows,
      shape: {
        borderRadius: 8,
      },
      typography,
      zIndex: {
        appBar: 1251,
        modal: 1251,
      },
    }
    // plPL
  );
};
