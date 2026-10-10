import {
  type Theme as MUITheme,
  type ThemeOptions as MUIThemeOptions,
} from "@mui/material/styles";
import {
  type Palette as MuiPalette,
  type PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPalette {
    readonly layout: {
      readonly black: string;
      readonly blackGreen: string;
    };
    readonly deepCyan: {
      readonly main: string;
      readonly light: string;
      readonly dark: string;
    };
    readonly main: {
      readonly main: string;
      readonly light: string;
      readonly dark: string;
    };
  }

  interface PaletteOptions extends Partial<MuiPaletteOptions> {
    readonly layout?: {
      readonly black: string;
      readonly blackGreen: string;
    };
    readonly deepCyan?: {
      readonly main: string;
      readonly light: string;
      readonly dark: string;
    };
    readonly main?: {
      readonly main: string;
      readonly light: string;
      readonly dark: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface CustomTheme {
    readonly exampleHowToAddNewProp: {
      readonly main: string;
    };
  }

  interface Theme extends MUITheme, CustomTheme {}

  interface ThemeOptions extends MUIThemeOptions {
    readonly exampleHowToAddNewProp?: {
      readonly main?: string;
    };
  }
}
