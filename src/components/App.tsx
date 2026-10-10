import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "../config/muiTheme";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchBlogPosts } from "../redux/blog/blogSlice";
import { type RootState } from "../redux/store";
import { fetchUsers } from "../redux/user/userSlice";

const LazyHomepage = lazy(async () => import("./GlobalStyles/HomePage"));

export const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBlogPosts());
  }, []);

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LazyHomepage />
      </Router>
    </ThemeProvider>
  );
};
