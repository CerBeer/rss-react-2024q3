import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import App from "../App";

/* Header */
describe("App", () => {
  it("renders the page Header", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.queryByText("Search for Star Wars person or character"),
    ).toBeInTheDocument();
  });

  it("renders the page and includes the Search component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("search-query-input")).toBeInTheDocument();
  });
});
