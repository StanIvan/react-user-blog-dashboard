import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";

import blogReducer from "./blog/blogSlice";
import themeReducer from "./theme/themeSlice";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
  theme: themeReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
