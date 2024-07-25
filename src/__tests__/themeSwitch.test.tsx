import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import store from "../redux/store/store";
import App from "../App";
import { Theme } from "../contexts/theme";

describe("Theme switch", () => {
  it("renders the component ThemeSwitch", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`${Theme.Dark} mode`)).toBeInTheDocument();
  });

  it("switch to dark theme", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.setup().click(screen.getByTestId("theme-change-input"));
    expect(screen.getByText(`${Theme.Light} mode`)).toBeInTheDocument();
    await userEvent.setup().click(screen.getByTestId("theme-change-input"));
    expect(screen.getByText(`${Theme.Dark} mode`)).toBeInTheDocument();
  });
});
