import { createTheme, type Theme } from "@mui/material/styles";

export type MuiThemeMode = "dark" | "light";

export enum ThemeMode {
  dark = "dark",
  light = "light",
}

export const theme = (mode: MuiThemeMode): Theme => {
  const themeValue: Theme = createTheme({
    palette: {
      mode,
      layout: {
        black: "#314257",
        blackGreen: "#212821",
      },
      primary: {
        main: "#1976d2",
      },
      main: {
        main: "#1976d2",
        light: "#41979e",
        dark: "#1976d2",
      },
      deepCyan: {
        main: "#64ffda",
        light: "#64ffda",
        dark: "#c7ffed",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
        defaultProps: { variant: "contained", size: "small" },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: "default",
            "&.Mui-checked": {
              color: "#1976d2",
            },
            "&.MuiCheckbox-indeterminate": {
              color: "#1976d2",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#1976d2",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#fff",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#1976d2",
            },
          },
        },
      },
    },
  });

  return themeValue;
};
