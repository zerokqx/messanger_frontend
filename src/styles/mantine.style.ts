import { createTheme } from "@mantine/core";

const blackWhiteTheme = createTheme({
  colors: {
    black: [
      "#000000", // 0
      "#000000", // 1
      "#000000", // 2
      "#000000", // 3
      "#000000", // 4
      "#000000", // 5
      "#000000", // 6
      "#000000", // 7
      "#000000", // 8
      "#000000", // 9
    ],
    white: [
      "#FFFFFF", // 0
      "#FFFFFF", // 1
      "#FFFFFF", // 2
      "#FFFFFF", // 3
      "#FFFFFF", // 4
      "#FFFFFF", // 5
      "#FFFFFF", // 6
      "#FFFFFF", // 7
      "#FFFFFF", // 8
      "#FFFFFF", // 9
    ],
  },

  primaryColor: "black",
  primaryShade: { light: 7, dark: 7 },

  white: "#FFFFFF",
  black: "#000000",

  fontFamily:
    "'JetBrains Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
  fontFamilyMonospace: "'JetBrains Mono', monospace",

  headings: {
    fontFamily: "'Montserrat', 'Inter', sans-serif",
    fontWeight: "700",
    textWrap: "balance",
    sizes: {
      h1: { fontSize: "2.5rem", fontWeight: "700" },
      h2: { fontSize: "2rem", fontWeight: "700" },
      h3: { fontSize: "1.75rem", fontWeight: "700" },
      h4: { fontSize: "1.5rem", fontWeight: "700" },
      h5: { fontSize: "1.25rem", fontWeight: "700" },
      h6: { fontSize: "1rem", fontWeight: "700" },
    },
  },

  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  defaultRadius: "md",

  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },

  lineHeights: {
    xs: "1.1",
    sm: "1.2",
    md: "1.4",
    lg: "1.6",
    xl: "1.8",
  },

  breakpoints: { xs: "36em", sm: "48em", md: "62em", lg: "75em", xl: "88em" },

  shadows: {
    xs: "none",
    sm: "none",
    md: "none",
    lg: "none",
    xl: "none",
  },
});

export default blackWhiteTheme;
