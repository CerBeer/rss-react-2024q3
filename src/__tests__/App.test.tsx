import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

/* Header */
describe("App", () => {
  it("renders the page Header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.queryByText("Search for Star Wars person or character"),
    ).toBeInTheDocument();
  });

  it("renders the page and includes the Search component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("search-query-input")).toBeInTheDocument();
  });
});
