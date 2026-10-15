import React, { lazy, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchBlogPosts } from "../redux/blog/blogSlice";
import { fetchUsers } from "../redux/user/userSlice";

const LazyHomepage = lazy(async () => import("./GlobalStyles/HomePage"));

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBlogPosts());
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LazyHomepage />
    </Router>
  );
};
