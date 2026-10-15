import { Leaf } from "lucide-react";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import routes from "../../config/routes/routes";
import { ThemeChanger } from "./ThemeChanger";

const HomePage = () => (
  <div className="min-h-screen bg-background">
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <header className="flex h-20 items-center justify-between border-b border-border/70">
        <Link
          className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          to="/"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Leaf aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight">
              Fern &amp; Folio
            </span>
            <span className="block text-xs text-muted-foreground">
              People &amp; stories
            </span>
          </span>
        </Link>
        <ThemeChanger />
      </header>
      <main className="py-8 sm:py-10">
        <Routes>
          {routes.map((route) => (
            <Route
              element={<route.component />}
              key={route.id}
              path={`${route.path}`}
            />
          ))}
        </Routes>
      </main>
      <footer className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        A calm place to care for your community and its stories.
      </footer>
    </div>
  </div>
);

export default HomePage;
