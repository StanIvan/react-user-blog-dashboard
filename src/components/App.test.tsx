import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import { setupStore } from "../redux/store";
import { App } from "./App";

// mock the lazy-loaded component
jest.mock("./GlobalStyles/HomePage", () => ({
  __esModule: true,
  default: () => <div>HomePage</div>,
}));

describe("App Component", () => {
  it("renders the ThemeProvider with the correct theme mode", async () => {
    render(
      <Provider store={setupStore(undefined)}>
        <App />
      </Provider>,
    );

    await waitFor(() => screen.getByText(/HomePage/i));

    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
});
