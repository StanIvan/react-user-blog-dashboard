import { LocalStorageKeys } from "../../constants/LocalStorage";
import reducer, { changeTheme, ThemeState } from "../theme/themeSlice";

describe("themeSlice", () => {
  beforeEach(() => {
    // clear localStorage and reset any mocks before each test.
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ mode: "light" });
  });

  it("should change the theme to dark and update localStorage", () => {
    // spy on setItem from Storage.prototype
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    const previousState: ThemeState = { mode: "light" };

    const action = changeTheme("dark");
    const newState = reducer(previousState, action);

    expect(newState.mode).toBe("dark");
    expect(setItemSpy).toHaveBeenCalledWith(LocalStorageKeys.themeMode, "dark");
  });

  it("should change the theme to light and update localStorage", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    const previousState: ThemeState = { mode: "dark" };

    const action = changeTheme("light");
    const newState = reducer(previousState, action);

    expect(newState.mode).toBe("light");
    expect(setItemSpy).toHaveBeenCalledWith(
      LocalStorageKeys.themeMode,
      "light",
    );
  });
});
