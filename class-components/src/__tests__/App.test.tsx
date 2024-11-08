import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("demo", () => {
  expect(true).toBe(true);
});

/* Header */
describe("render", () => {
  it("renders the page Header", () => {
    render(<App />);

    expect(
      screen.queryByText("Search for Star Wars person or character"),
    ).toBeInTheDocument();
  });
});

/* Search component */
describe("App component", () => {
  it("renders the page and includes the Search component", () => {
    render(<App />);

    expect(screen.getByTestId("search-query-input")).toBeInTheDocument();
  });
});
