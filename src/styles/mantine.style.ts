import type { MantineTheme } from "@mantine/core";

import { createTheme } from "@mantine/core";

// Палитра взята из tokyonight.nvim/VSCode (night variant)
const theme = createTheme({
  colors: {
    // TokyoNight Blue
    blue: [
      "#1a1b26", // 0 - background (night)
      "#16161e", // 1 - background darker
      "#223165", // 2
      "#394b70", // 3
      "#4e5d91", // 4
      "#5a72aa", // 5
      "#7aa2f7", // 6 - primary
      "#6183bb", // 7
      "#3d59a1", // 8
      "#24283b", // 9 - deepest bg (storm)
    ],
    // Accent Pink/Red
    pink: [
      "#f7768e", // 0 - main
      "#dc4343", // 1
      "#e64e6a", // 2
      "#e06666", // 3
      "#ff9e64", // 4
      "#ff6b6b", // 5
      "#c53b53", // 6
      "#b2555a", // 7
      "#b84865", // 8
      "#a73e4c", // 9
    ],
    // Accent Yellow
    yellow: [
      "#e0af68", // 0
      "#e5c07b", // 1
      "#e7c787", // 2
      "#dbb561", // 3
      "#e5d887", // 4
      "#ffeea2", // 5
      "#bdae93", // 6
      "#b7bb8b", // 7
      "#d7ba7d", // 8
      "#bfc09a", // 9
    ],
    // Accent Green
    green: [
      "#9ece6a", // 0
      "#73daca", // 1
      "#41a6b5", // 2
      "#2ac3de", // 3
      "#7dcfff", // 4
      "#1abc9c", // 5
      "#68a063", // 6
      "#69b073", // 7
      "#54b6ad", // 8
      "#638b7c", // 9
    ],
    // Base
    gray: [
      "#565f89", // 0 - comments
      "#414868", // 1 - line numbers
      "#24283b", // 2 - bg
      "#1a1b26", // 3 - darkest bg
      "#a9b1d6", // 4 - fg
      "#9aa5ce", // 5 - lighter comments
      "#c0caf5", // 6
      "#cfc9c2", // 7
      "#d7d7a5", // 8
      "#e1e2e7", // 9
    ],
  },
  primaryColor: "blue",
  primaryShade: { light: 6, dark: 6 },
  white: "#c0caf5",
  black: "#1a1b26",
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
    xs: "0 1px 2px 0 #0001",
    sm: "0 1.5px 6px 0 #0002",
    md: "0 2px 12px 0 #0003",
    lg: "0 4px 18px 2px #0004",
    xl: "0 8px 24px 4px #0005",
  },
});

export default theme;
