import { createTheme } from '@mui/material/styles';

const colors = {
  primary: '#1A3300',
  secondary: '#2C5602',
  accent: '#FF8400',
  light: '#F6F5E8',
  white: '#FFFFF',
  black: '#000000'
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    accent: {
      main: colors.accent
    },
    light: {
      main: colors.light
    }
  }
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "150px",
    },
  },
};