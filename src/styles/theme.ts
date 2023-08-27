import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  cssVarPrefix: '',
  colorSchemes: {
    light: {
      palette: {
        // Color adjustments made using https://mdigi.tools/darken-color/
        primary: {
          50: '#f5f9ed',  // lighten 90%
          100: '#ebf2dc', // lighten 80%
          200: '#d7e6b9', // lighten 60%
          300: '#cddfa7', // lighten 50%
          400: '#bad384', // lighten 30%
          500: '#9CC04F', // base color
          600: '#7fa039', // darken 20%
          700: '#6f8c32', // darken 30%
          800: '#5f782b', // darken 40%
          900: '#4f6424', // darken 50%
        },
      },
    },
  },
});
