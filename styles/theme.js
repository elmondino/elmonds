import { theme as chakraTheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  ...chakraTheme.fonts,
  body: `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const breakpoints = createBreakpoints({
  sm: "40em", // "640px"
  md: "48em", // "768px"
  lg: "64em", // "1024px"
  xl: "80em", // "1240px"
});

const overrides = {
  ...chakraTheme,
  fonts,
  breakpoints,
  fontWeights: {
    normal: 300,
    medium: 600,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  colors: {
    grayCustom: {
      900: "#171717",
    },
    orangeCustom: {
      700: "#ff880a",
      900: '#eb7900'
    },
    violetCustom: {
      900: "#aa00ff",
    },
    blueCustom: {
      400: "#62bdff",
    },
  },
};

const customTheme = extendTheme(overrides);

export default customTheme;
