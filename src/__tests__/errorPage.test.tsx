import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ErrorPage from "../components/errorPage/errorPage";

describe("ErrorPage 404", () => {
  it("renders error message", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByText(/Sorry, the page is not found./i),
    ).toBeInTheDocument();
  });

  it("renders Home Button", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("button", {
        name: /Go home/i,
      }),
    ).toBeInTheDocument();
  });
});
