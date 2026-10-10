import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { ThemeChanger } from "./ThemeChanger";

const StyledWrapper = styled.div`
  padding: 24px;
`;

const Layout = () => (
  <>
    <ThemeChanger />
    <StyledWrapper>
      <Outlet />
    </StyledWrapper>
  </>
);

export default Layout;
