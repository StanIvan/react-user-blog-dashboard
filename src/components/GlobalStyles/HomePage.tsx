import React from "react";
import { Route, Routes } from "react-router-dom";

import routes from "../../config/routes/routes";
import { Main, StyledRoot } from "./styles";
import { ThemeChanger } from "./ThemeChanger";

const HomePage = () => (
  <StyledRoot>
    <Main>
      <ThemeChanger />
      <Routes>
        {routes.map((route) => (
          <Route
            element={<route.component />}
            key={route.id}
            path={`${route.path}`}
          />
        ))}
      </Routes>
    </Main>
  </StyledRoot>
);

export default HomePage;
