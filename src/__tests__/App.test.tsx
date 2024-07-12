import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

/* Header */
describe("render", () => {
  it("renders the page Header", () => {
    render(<App />);

    expect(
      screen.queryByText("Search for Star Wars person or character"),
    ).toBeInTheDocument();
    screen.debug();
  });
});

/* Search component */
describe("App component", () => {
  it("renders the page and includes the Search component", () => {
    render(<App />);

    expect(screen.getByTestId("search-query-input")).toBeInTheDocument();
  });
});
