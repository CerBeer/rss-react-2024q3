import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/errorBoundary/errorBoundary";

function ErrorComponent() {
  throw new Error("Test error");
  return <div> </div>;
}

describe("ErrorBoundary", () => {
  it("renders when no error", () => {
    render(
      <ErrorBoundary>
        <div>No error</div>
      </ErrorBoundary>,
    );

    expect(screen.queryByText("No error")).toBeInTheDocument();
  });

  it("renders error message", () => {
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => null);

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("button", { name: /Fix this error/i }),
    ).toBeInTheDocument();

    spy.mockRestore();
  });
});
