import React from "react";
import { Outlet } from "react-router-dom";

import { ThemeChanger } from "./ThemeChanger";

const Layout = () => (
  <div className="min-h-screen bg-background p-6 text-foreground">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex justify-end">
        <ThemeChanger />
      </div>
      <Outlet />
    </div>
  </div>
);

export default Layout;
