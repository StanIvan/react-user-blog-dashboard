import { Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";

import { Button } from "../../common/ui/button";
import { LocalStorageKeys } from "../../constants/LocalStorage";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { changeTheme } from "../../redux/theme/themeSlice";

export const ThemeChanger = (): JSX.Element => {
  const mode = useTypedSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageMode = localStorage.getItem(LocalStorageKeys.themeMode);
    const isDarkMode =
      Boolean(localStorageMode) && localStorageMode !== "light";

    dispatch(changeTheme(isDarkMode ? "dark" : "light"));
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <Button
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      className="rounded-full bg-card text-muted-foreground shadow-none hover:text-foreground"
      onClick={() => dispatch(changeTheme(mode === "dark" ? "light" : "dark"))}
      size="icon"
      variant="outline"
    >
      {mode === "dark" ? (
        <Sun aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Moon aria-hidden="true" className="h-4 w-4" />
      )}
    </Button>
  );
};
