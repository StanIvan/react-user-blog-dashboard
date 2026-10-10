import { createSlice } from "@reduxjs/toolkit";

import { LocalStorageKeys } from "../../constants/LocalStorage";

export interface ThemeState {
  mode: "light" | "dark";
}

const themeState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: themeState,
  reducers: {
    changeTheme: (state, action) => {
      localStorage.setItem(LocalStorageKeys.themeMode, action.payload);
      return {
        ...state,
        mode: action.payload,
      };
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
