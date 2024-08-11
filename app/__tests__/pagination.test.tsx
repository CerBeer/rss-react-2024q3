import { describe, it, expect } from "vitest";
import Pagination from "../components/pagination";
import { mockQuery } from "./test-utils/mockData";
import { render, screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";

describe("Pagination", () => {
  it("renders Pagination", () => {
    render(<Pagination query={mockQuery} totalItem={8} />);
    expect(screen.queryByText("prev")).not.toBeInTheDocument();
    expect(screen.queryByText("1 of 1")).toBeInTheDocument();
    expect(screen.queryByText("next")).not.toBeInTheDocument();
  });

  it("renders Pagination 5 pages", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => {
          return <Pagination query={mockQuery} totalItem={45} />;
        },
      },
    ]);
    render(<RemixStub />);
    expect(screen.queryByText("1 of 5")).toBeInTheDocument();
    expect(screen.queryByText("next")).toBeInTheDocument();
  });
});
