import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ErrorPage from "../components/errorPage/errorPage";

describe("ErrorPage 404", () => {
  it("renders error message", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByText(/Sorry, the page is not found./i),
    ).toBeInTheDocument();

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it("renders Home Button", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("button", {
        name: /Go home/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders Back Button", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("button", {
        name: /Go back/i,
      }),
    ).toBeInTheDocument();
  });

  it("push Back button", async () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    const backButton = screen.getByRole("button", { name: /Go back/i });

    expect(backButton).toBeTruthy();

    await userEvent.click(backButton);
  });

  it("push Home button", async () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    const homeButton = screen.getByRole("button", { name: /Go home/i });

    expect(homeButton).toBeTruthy();

    await userEvent.click(homeButton);
  });
});
